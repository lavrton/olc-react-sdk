import React, {useEffect, useState} from 'react';

// Hooks
// import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

// Actions
// import {
//   uploadTemplate,
//   createTemplate,
//   updateTemplate,
//   clearTemplateFields,
//   loadFormDataToStore,
//   downloadProof,
// } from '../../../redux/actions/template-builder';
// import {failure, success} from '../../../redux/actions/snackbar-actions';

// Components
// import EditTemplateNameModel from './EditTemplateNameModel';
// import SaveTemplateModel from './SaveTemplateModel';
import ConfirmNavigateDialog from './ConfirmNavigateDialog';

// Utils
import {multiPageTemplates} from '../../utils/template-builder';
import fonts from '../../utils/fonts.json';
import {getItem, setItem} from '../../utils/local-storage';
import Typography from "../GenericUIBlocks/Typography";
import Button from "../GenericUIBlocks/Button";
import CircularProgress from "../GenericUIBlocks/CircularProgress";





// import {MESSAGES} from '../../../utils/message';

// MUI Components
// import {
//   div,
//   button,
//   div,
//   button,
//   span,
//   CircularProgress,
// } from '@mui/material';



// Icons
// import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
// import EditIcon from '../../../assets/images/templates/edit-pencil-icon.svg';

// Styles
import './styles.scss';

const SAVE_button_TEXT = 'Save';

/**
 * Represents the top navigation bar of a template builder application.
 * Handles saving and navigation logic, as well as displaying a confirmation dialog for unsaved changes.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.store - The store object used for saving the template.
 * @param {boolean} props.isStoreUpdated - Indicates whether the store has been updated.
 * @returns {JSX.Element} The top navigation bar component.
 */

const TopNavigation = ({
  id,
  showBackButton = true,
  store,
  isStoreUpdated,
  showViewProofbutton,
}) => {
  // TODO: Take Template ID from props instead of route
  // const { id } = useParams();

  const [showNavigateDialog, setShowNavigateDialog] = useState(true);
  const [isShowModel, setIsShowModel] = useState({
    open: false,
    model: '',
    loading: false,
  });
  const [downloadingProof, setDownloaingProof] = useState(false);

  // const title = useSelector((state) => state.templateReducer.title);
  // const product = useSelector((state) => state.templateReducer.product);
  // const dynamicFields = useSelector(
  //   (state) => state.templateReducer.dynamicFields
  // );
  // const defaultFields = useSelector(
  //   (state) => state.templateReducer.defaultDynamicFields
  // );
  // const templateType = useSelector(
  //   (state) => state.templateReducer.templateType
  // );
  // const envelopeType = useSelector(
  //   (state) => state.templateReducer.envelopeType
  // );


  const title = '';
  const product = [];
  const dynamicFields = [];
  const defaultFields = [];
  const templateType = '';
  const envelopeType = '';


  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      const formData = getItem('formData');
      if (formData && !title) {
        // dispatch(loadFormDataToStore(formData));
      } else {
        handleSaveFormData();
      }
    }
  }, [title]);

  const handleSaveFormData = () => {
    const data = {title, product, templateType, envelopeType};
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
    // navigate('/templates');
  };

  const handleClearFilters = () => dispatch(clearTemplateFields());

  const handleViewProofWithLamda = async () => {
    try {
      setDownloaingProof(true);
      const fields = [...defaultFields, ...Object.values(dynamicFields)];
      const json = store.toJSON();
      let jsonString = JSON.stringify(json);
      fields.forEach(({key, defaultValue, value}) => {
        const regex = new RegExp(key, 'g');
        jsonString = jsonString.replace(regex, defaultValue || value);
      });
      const jsonWithDummyData = JSON.parse(jsonString);
      const response = await downloadProof({
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
        const blob = new Blob([uint8Array], {type: 'application/pdf'});

        // Create an Object URL for the Blob
        const url = URL.createObjectURL(blob);
        downloadPDF(title.substring(0, 20), url);
        // dispatch(success('Download Proof generated successfully'));
      } else {
        // dispatch(failure(response.data.message));
      }
    } catch (error) {
      // dispatch(
      //   failure(
      //     error?.response?.data?.message ||
      //       error?.message ||
      //       'Error while downloading proof'
      //   )
      // );
    } finally {
      setDownloaingProof(false);
    }
  };

  const downloadPDF = (title, url) => {
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

  function extractFontFamilies(jsonData) {
    const fontFamilies = [];

    // Iterate through each object in the JSON data
    jsonData.forEach((obj) => {
      if (obj.children) {
        // Iterate through each child object
        obj.children.forEach((child) => {
          if (child.type === 'text' && child.fontFamily) {
            // Extract font family from text objects
            fontFamilies.push(child.fontFamily);
          }
        });
      }
    });
    return fontFamilies;
  }

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
      const customFonts = fontFamilies.filter((item) => !fonts.includes(item));

      const availableBase64inJson = jsonData?.fonts?.map(
        (font) => font?.fontFamily
      );

      const unAvailableFonts = customFonts.filter(
        (item) => !availableBase64inJson?.includes(item)
      );

      if (unAvailableFonts?.length) {
        // dispatch(
        //   failure(
        //     `Please upload ${unAvailableFonts[0]} font in My Fonts section.`
        //   )
        // );
        return;
      }

      if (multiPageTemplates.includes(product.productType)) {
        const backJsonData = {...jsonData, pages: [jsonData.pages[1]]};
        await store.loadJSON(backJsonData);
        await store.waitLoading();
        const backBlob = await store.toBlob();
        formData.append('backThumbnail', backBlob, 'backLogo.png');
        store.loadJSON(jsonData);
      }
      const jsonString = JSON.stringify(jsonData);
      const blobData = new Blob([jsonString], {type: 'application/json'});
      formData.append('json', blobData, 'template.json');
      formData.append('thumbnail', blob, 'logo.png');
      selectedFields = allFields.filter((field) =>
        jsonString.includes(field.key)
      );
    }
    setIsShowModel((prev) => ({...prev, loading: true}));

    const response = await uploadTemplate(formData);
    if (response?.status === 200) {
      if (!id) {
        setTimeout(
          () => handleCreateTemplate(response?.data?.data, selectedFields),
          1000
        );
      } else {
        setTimeout(
          () => handleUpdateTemplate(response?.data?.data, selectedFields),
          1000
        );
      }
    } else if (
      response?.status === 418 &&
      response?.data?.message ==
        'You have reached your Templates limit, updgrade you Plan to add more'
    ) {
      handleChangeModel('', 'false');
    } else {
      // dispatch(failure(response?.data?.message || MESSAGES.GENERAL_ERROR));
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
    <div
      className="top-navigation-container"
    >
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
      {/* {isShowModel.open && isShowModel.model === "save" && (
        <SaveTemplateModel
          loading={isShowModel.loading}
          open={isShowModel.open}
          handleClose={() => handleChangeModel()}
          handleSave={handleSave}
        />
      )} */}
      <div container spacing={2}>
        <div item lg={4} md={4} sm={2} xs={4}>
          {showBackButton && (
            <div className="actionsBtnWrapper left">
              <Button
                className="templateCreateBtn active"
                onClick={handleBackPress}
              >
                {/* <ArrowBackRoundedIcon /> */}
                <Typography>Templates</Typography>
              </Button>
            </div>
          )}
        </div>
        <div item lg={4} md={2} sm={2} xs={4}>
          <div className="middle">
            <Typography>{title} </Typography>
            {/* <IconButton onClick={() => handleChangeModel("edit")}>
              <img src={EditIcon} />
            </IconButton> */}
          </div>
        </div>
        <div item lg={4} md={6} sm={8} xs={4}>
          <div className="actionsBtnWrapper right">
            <Button onClick={handleViewProofWithLamda} className={downloadingProof ? "loading" : ''}>
              {downloadingProof ? (
                <CircularProgress
                  sx={{
                    color: "#ed5c2f",
                    width: "25px !important",
                    height: "25px !important",
                  }}
                />
              ) : (
                "Download Proof"
              )}
            </Button>
            <Button onClick={handleBackPress}> Cancel</Button>
            <Button
              className="templateCreateBtn active"
              onClick={() => handleChangeModel("save")}
            >
              <Typography>{'Save'}</Typography>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
