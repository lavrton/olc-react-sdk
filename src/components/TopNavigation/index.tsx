import React, { useEffect, useState } from 'react';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';

// Actions
import {
  clearTemplateFields,
  loadFormDataToStore,
  downloadProof,
} from '../../redux/actions/templateActions';
import { failure, success } from '../../redux/actions/snackbarActions';

// Components
import SaveTemplateModel from './SaveTemplateModel';
import ConfirmNavigateDialog from './ConfirmNavigateDialog';
import EditTemplateNameModel from './EditTemplateNameModel';

// Utils
import { downloadPDF, extractFontFamilies, multiPageTemplates } from '../../utils/template-builder';
import { getItem, setItem } from '../../utils/local-storage';
import { MESSAGES } from '../../utils/message';
// @ts-ignore
import fonts from '../../utils/fonts.json';

// UI Components
import Typography from "../GenericUIBlocks/Typography";
import Button from "../GenericUIBlocks/Button";
import CircularProgress from "../GenericUIBlocks/CircularProgress";
import { GridContainer, GridItem } from '../GenericUIBlocks/Grid';

// Icons
// @ts-ignore
import EditIcon from '../../assets/images/templates/edit-pencil-icon.tsx';

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

const buttonStyles: React.CSSProperties = {
  maxWidth: '120px',
  minHeight: '40px',
  backgroundColor: '#fff',
  color: 'var(--text-color)',
  border: '0.5px solid var(--border-color)',
  fontSize: '15px',
  fontWeight: '500',
};

const progressStyles: React.CSSProperties = {
  width: '20px',
  height: '20px',
  border: '2px solid var(--primary-color)',
};

interface TopNavigationProps {
  store: any;
  createTemplateRoute?: string | null;
  isStoreUpdated: boolean;
  olcTemplate?: Record<string, any>;
  onReturnAndNavigate?: () => void;
  onSubmit?: (payload: any) => Promise<any>;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  store,
  createTemplateRoute,
  isStoreUpdated,
  olcTemplate,
  onReturnAndNavigate,
  onSubmit,
}) => {

  const [showNavigateDialog, setShowNavigateDialog] = useState<boolean>(false);
  const [isShowModel, setIsShowModel] = useState<{
    open: boolean;
    model: string;
    loading: boolean;
  }>({
    open: false,
    model: '',
    loading: false,
  });
  const [downloadingProof, setDownloaingProof] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const title = useSelector((state: RootState) => state.templates.title);
  const product = useSelector((state: RootState) => state.templates.product) as Record<string, any>;

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
      handleNavigation(createTemplateRoute || '/create-template');
    }
  };

  const handleNavigation = async (route = '/') => {
    handleClearFilters();
    if (templateType === 'json' && product?.productType !== 'Real Penned Letter') {
      await store.history.clear();
    }
    onReturnAndNavigate ? onReturnAndNavigate() : navigate(route); 
  };

  const handleClearFilters = () => dispatch(clearTemplateFields());

  const handleViewProofWithLamda = async () => {
    try {
      setDownloaingProof(true);
      const fields = [...defaultFields, ...Object.values(dynamicFields)];
      let json = store.toJSON();
      if (product?.productType === "Real Penned Letter") {
        let clonedJson = JSON.stringify(json)
          .replace(/\(\(/g, "{{")
          .replace(/\)\)/g, "}}");
        json = JSON.parse(clonedJson);
      }
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

  const handleSave = async () => {
    try {
      const formData = new FormData();
      const allFields = [...defaultFields, ...Object.values(dynamicFields)];
      let selectedFields: any = [];
      if (templateType === 'json') {
        const blob = await store.toBlob();
        let jsonData = store.toJSON();

        if (product?.productType === "Real Penned Letter") {
          let clonedJson = JSON.stringify(jsonData)
            .replace(/\(\(/g, "{{")
            .replace(/\)\)/g, "}}");
          jsonData = JSON.parse(clonedJson);
        }

        // get all fonts family from json
        const fontFamilies = extractFontFamilies(jsonData?.pages);

        // extract custom fonts and remove google fonts from that array
        const customFonts = fontFamilies.filter((item: any) => !fonts.includes(item));

        const availableBase64inJson = jsonData?.fonts?.map((font: any) => font?.fontFamily);

        const unAvailableFonts = customFonts.filter((item: any) => !availableBase64inJson?.includes(item));

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
      }
      setIsShowModel((prev) => ({ ...prev, loading: true }));

      formData.append('title', title);
      formData.append('productId', product?.id);
      selectedFields.length ? formData.append('fields', JSON.stringify(selectedFields)) : undefined;
      envelopeType.length ?  formData.append('envelopeType', envelopeType) : undefined;

      if (onSubmit) {
        const saveTemplate = await onSubmit(formData);
        if (saveTemplate) {
          // dispatch(success(olcTemplate ? 'Template Updated Successfully' : 'Template Created Successfully'));
          handleNavigation();
        }
      } else {
        dispatch(failure("Please add onSubmit handler via Props to save template"))
      }
    } catch (error) {
      return error;
    } finally {
      setIsShowModel((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleChangeModel = (model: string = '', loading: string | null = null) => {
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
          handleNavigateAction={() =>
            handleNavigation(createTemplateRoute || '/create-template')
          }
        />
      )}
      {isShowModel?.open && isShowModel?.model === 'edit' && (
        <EditTemplateNameModel
          open={isShowModel?.open}
          handleClose={() => handleChangeModel()}
        />
      )}
      {isShowModel.open && isShowModel.model === 'save' && (
        <SaveTemplateModel
          loading={isShowModel.loading}
          open={isShowModel.open}
          handleClose={() => handleChangeModel()}
          handleSave={handleSave}
        />
      )}
      <GridContainer style={{alignItems: 'center'}}>
        <GridItem lg={4} md={4} sm={0} xs={0}></GridItem>
        <GridItem lg={4} md={2} sm={2} xs={12}>
          <div className="middle">
            <Typography>{title}</Typography>
            <div onClick={() => handleChangeModel('edit')}>
              <EditIcon fill="var(--text-color)" />
            </div>
          </div>
        </GridItem>
        <GridItem lg={4} md={6} sm={9} xs={12}>
          <div className="actionsBtnWrapper right">
            <Button
              style={{
                ...buttonStyles,
                fontWeight: '400',
                maxWidth: 'auto',
                minWidth: '100px',
              }}
              onClick={handleViewProofWithLamda}
            >
              {downloadingProof ? (
                <CircularProgress style={progressStyles} />
              ) : (
                MESSAGES.TEMPLATE.DOWNLOAD_PROOF_BUTTON
              )}
            </Button>
            <Button
              style={{
                ...buttonStyles,
                border: '0.5px solid var(--primary-color)',
                color: 'var(--primary-color)',
              }}
              onClick={() => handleBackPress()}
            >
              {MESSAGES.TEMPLATE.CANCEL_BUTTON}
            </Button>
            <Button
              style={{
                ...buttonStyles,
                border: 'none',
                backgroundColor: 'var(--primary-color)',
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
