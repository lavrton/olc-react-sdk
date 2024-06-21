import React, { useEffect, useState } from 'react';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '@/redux/store';

// Actions
import {
  uploadTemplate,
  createTemplate,
  updateTemplate,
  clearTemplateFields,
  loadFormDataToStore,
  downloadProof,
} from '../../redux/actions/templateActions';
import { failure, success } from '../../redux/actions/snackbarActions';

// Components
import SaveTemplateModel from './SaveTemplateModel';
import ConfirmNavigateDialog from './ConfirmNavigateDialog';
// import EditTemplateNameModel from './EditTemplateNameModel';


// Utils
import { extractFontFamilies, multiPageTemplates } from '../../utils/template-builder';
import { getItem, setItem } from '../../utils/local-storage';
import { MESSAGES } from '../../utils/message';
import fonts from '../../utils/fonts.json';

// UI Components
import Typography from "../GenericUIBlocks/Typography";
import Button from "../GenericUIBlocks/Button";
import CircularProgress from "../GenericUIBlocks/CircularProgress";
import { GridContainer, GridItem } from '../GenericUIBlocks/Grid';


// Icons
import EditIcon from '../../assets/images/templates/edit-pencil-icon.svg';

// Styles
import './styles.scss';


/**
 * Represents the top navigation bar of a template builder application.
 * Handles saving and navigation logic, as well as displaying a confirmation dialog for unsaved changes.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.store - The store object used for saving the template.
 * @param {boolean} props.isStoreUpdated - Indicates whether the store has been updated.
 * @returns {JSX.Element} The top navigation bar component.
 */

const buttonStyles = {
  maxWidth: '100px',
  minHeight: '40px',
  backgroundColor: '#fff',
  color: '#000',
  border: '0.5px solid #303030',
  fontSize: '15px'
};

const progressStyles = {
  width: '20px',
  height: '20px',
};

const TopNavigation = ({
  store,
  isStoreUpdated,
}) => {

  const [showNavigateDialog, setShowNavigateDialog] = useState(false);
  const [isShowModel, setIsShowModel] = useState({
    open: false,
    model: '',
    loading: false,
  });
  const [downloadingProof, setDownloaingProof] = useState(false);

  const { id } = useParams();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const title = useSelector((state: RootState) => state.templates.title);
  const product = useSelector((state: RootState) => state.templates.product);

  const dynamicFields = useSelector(
    (state: RootState) => state.templates.dynamicFields
  );
  const defaultFields = useSelector(
    (state: RootState) => state.templates.defaultDynamicFields
  );
  const templateType = useSelector(
    (state: RootState) => state.templates.templateType
  );
  const envelopeType = useSelector(
    (state: RootState) => state.templates.envelopeType
  );

  useEffect(() => {
    if (!id) {
      const formData = getItem('formData');
      if (formData && !title) {
        dispatch(loadFormDataToStore(formData));
      } else {
        handleSaveFormData();
      }
    }
  }, [title]);

  const handleSaveFormData = () => {
    const data = { title, product, templateType, envelopeType };
    setItem('formData', JSON.stringify(data));
  };

  const handleBackPress = () => {
    if (isStoreUpdated) {
      setShowNavigateDialog(!showNavigateDialog);
    } else {
      handleNavigation();
    }
  };

  const handleNavigation = async () => {
    handleClearFilters();
    if (templateType === 'json') {
      await store.history.clear();
    }
    navigate('/');
  };

  const handleClearFilters = () => dispatch(clearTemplateFields());

  const handleViewProofWithLamda = async () => {
    try {
      setDownloaingProof(true);
      const fields = [...defaultFields, ...Object.values(dynamicFields)];
      const json = store.toJSON();
      let jsonString = JSON.stringify(json);
      fields.forEach(({ key, defaultValue, value }) => {
        const regex = new RegExp(key, 'g');
        jsonString = jsonString.replace(regex, defaultValue || value);
      });
      const jsonWithDummyData = JSON.parse(jsonString);
      const response: any = await downloadProof({
        json: jsonWithDummyData,
      });
      if (response.status === 200) {
        const binaryData = atob(response.data.data.base64);
        // Create a Uint8Array from the binary data
        const uint8Array = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }

        // Create a Blob from the Uint8Array
        const blob = new Blob([uint8Array], { type: 'application/pdf' });

        // Create an Object URL for the Blob
        const url = URL.createObjectURL(blob);
        downloadPDF(title.substring(0, 20), url);
        dispatch(success('Download Proof generated successfully'));
      } else {
        dispatch(failure(response?.data?.message));
      }
    } catch (error: any) {
      dispatch(
        failure(
          error?.response?.data?.message ||
          error?.message ||
          'Error while downloading proof'
        )
      );
    } finally {
      setDownloaingProof(false);
    }
  };

  const downloadPDF = (title: string, url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title + '.pdf';

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click on the link
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  const handleSave = async () => {
    const formData = new FormData();
    const allFields = [...defaultFields, ...Object.values(dynamicFields)];
    let selectedFields = [];
    if (templateType === 'json') {
      const blob = await store.toBlob();
      const jsonData = store.toJSON();

      // get all fonts family from json
      const fontFamilies = extractFontFamilies(jsonData?.pages);

      // extract custom fonts and remove google fonts from that array
      const customFonts = fontFamilies.filter(item => !fonts.includes(item));

      const availableBase64inJson = jsonData?.fonts?.map(font => font?.fontFamily);

      const unAvailableFonts = customFonts.filter(item => !availableBase64inJson?.includes(item));

      if (unAvailableFonts?.length) {
        dispatch(failure(`Please upload ${unAvailableFonts[0]} font in My Fonts section.`));
        return
      }

      if (multiPageTemplates.includes(product.productType)) {
        const backJsonData = { ...jsonData, pages: [jsonData.pages[1]] }
        await store.loadJSON(backJsonData);
        await store.waitLoading();
        const backBlob = await store.toBlob();
        formData.append('backThumbnail', backBlob, 'backLogo.png');
        store.loadJSON(jsonData);
      }
      const jsonString = JSON.stringify(jsonData);
      const blobData = new Blob([jsonString], { type: 'application/json' });
      formData.append('json', blobData, 'template.json');
      formData.append('thumbnail', blob, 'logo.png');
      selectedFields = allFields.filter(field => jsonString.includes(field.key));
    } else {
      if (!validateAndDispatch(html, 'Please pass valid HTML content')) {
        return;
      }

      if (product.productType === 'Postcards' && !validateAndDispatch(backHtml, 'Please pass valid HTML content for back side')) {
        return;
      }
      const extractFields = extractVariablesFromHtml(html);
      let extractFieldsBack = [];
      const htmlBlob = new Blob([html], { type: 'text/html' });
      formData.append('html', htmlBlob, 'template.html');
      if (product.productType === 'Postcards') {
        extractFieldsBack = extractVariablesFromHtml(backHtml);
        const backHtmlBlob = new Blob([backHtml], { type: 'text/html' });
        formData.append('backHtml', backHtmlBlob, 'template.html');
      }
      selectedFields = [...extractFields, ...extractFieldsBack].reduce((acc, current) => {
        var existingItem = acc.find(item => item.key === current.key);

        if (!existingItem) {
          acc.push({
            key: current.key,
            value: current.value,
            defaultValue: current.defaultValue
          });
        }

        return acc;
      }, []);
      selectedFields = selectedFields.map((item) => {
        const found = defaultFieldsHashMap[item.key] || dynamicFields[item.value];
        if (found) {
          return {
            ...item,
            value: found.value,
            defaultValue: found.defaultValue
          }
        }
        return item;
      })
    }
    setIsShowModel((prev) => ({ ...prev, loading: true }));

    const response = await uploadTemplate(formData);
    if (response?.status === 200) {
      if (!id) {
        setTimeout(() => handleCreateTemplate(response?.data?.data, selectedFields), 1000);
      } else {
        setTimeout(() => handleUpdateTemplate(response?.data?.data, selectedFields), 1000)
      }
    } else if (response?.status === 418 && response?.data?.message == "You have reached your Templates limit, updgrade you Plan to add more") {
      handleChangeModel('', 'false');
    } else {
      dispatch(
        failure(
          response?.data?.message ||
          MESSAGES.GENERAL_ERROR
        )
      );
      handleChangeModel('', 'false');
    }
  };

  const handleCreateTemplate = async (data, selectedFields) => {
    const response = await createTemplate({
      title: title,
      productId: product.id,
      fields: selectedFields,
      thumbnailPath: data.thumbnailPath,
      templatePath: data.templatePath,
      backTemplatePath: data.backTemplatePath || '',
      backThumbnailPath: data.backThumbnailPath || '',
      envelopeType,
    });
    if (response.status === 200) {
      // dispatch(success(response.data.message));
      handleNavigation();
    } else if (response.status == 418) {
      // nothing to do
    } else {
      // dispatch(failure(response.data.message));
    }
    handleChangeModel('', 'false');
  };

  const handleUpdateTemplate = async (data, selectedFields) => {
    const response = await updateTemplate(id, {
      title: title,
      fields: selectedFields,
      thumbnailPath: data.thumbnailPath,
      templatePath: data.templatePath,
      backTemplatePath: data.backTemplatePath || '',
      backThumbnailPath: data.backThumbnailPath || '',
    });
    if (response.status === 200) {
      // dispatch(success(response.data.message));
      handleNavigation();
    } else {
      // dispatch(failure(response.data.message));
    }
    handleChangeModel('', 'false');
  };
  const handleChangeModel = (model = '', loading = null) => {
    setIsShowModel((prev) => ({
      ...prev,
      open: !prev.open,
      loading: loading === 'false' ? false : prev.loading,
      model,
    }));
  };

  return (
    <div className="top-navigation-container">
      {showNavigateDialog && (
        <ConfirmNavigateDialog
          open={showNavigateDialog}
          handleClose={() => setShowNavigateDialog(false)}
          handleNavigateAction={handleNavigation}
        />
      )}
      {/* {isShowModel.open && isShowModel.model === "edit" && (
        <EditTemplateNameModel
          open={isShowModel.open}
          handleClose={() => handleChangeModel()}
        />
      )} */}
      {isShowModel.open && isShowModel.model === 'save' && (
        <SaveTemplateModel
          loading={isShowModel.loading}
          open={isShowModel.open}
          handleClose={() => handleChangeModel()}
          handleSave={handleSave}
        />
      )}
      <GridContainer>
        <GridItem lg={4} md={4} sm={2} xs={12}>
        </GridItem>
        <GridItem lg={4} md={2} sm={2} xs={12}>
          <div className="middle">
            <Typography>{title} </Typography>
            <div onClick={() => handleChangeModel("edit")}>
              <img src={EditIcon} />
            </div>
          </div>
        </GridItem>
        <GridItem lg={4} md={6} sm={8} xs={12}>
          <div className="actionsBtnWrapper right">
            <Button
              style={{ ...buttonStyles, maxWidth: 'auto', minWidth: '100px' }}
              onClick={handleViewProofWithLamda}
            >
              {downloadingProof ? (
                <CircularProgress style={progressStyles} />
              ) : (
                'Download Proof'
              )}
            </Button>
            <Button style={buttonStyles} onClick={() => handleBackPress()}>
              {MESSAGES.TEMPLATE.CANCEL_BUTTON}
            </Button>
            <Button
              style={{
                ...buttonStyles,
                border: 'none',
                backgroundColor: '#ed5c2f',
                color: '#fff',
              }}
              onClick={() => handleChangeModel('save')}
            >
              {MESSAGES.TEMPLATE.SUBMIT_BUTTON}
            </Button>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default TopNavigation;
