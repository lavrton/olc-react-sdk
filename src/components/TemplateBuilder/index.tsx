import React, { useEffect, useState } from 'react';

// Import Polotno and third-party libraries
import { PolotnoContainer, WorkspaceWrap } from 'polotno';
import { setUploadFunc } from 'polotno/config';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { Workspace } from 'polotno/canvas/workspace';
import { setGoogleFonts } from 'polotno/config';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { AppDispatch } from '../../redux/store';
import { StoreType } from 'polotno/model/store';

// Actions
import {
  uploadFile,
} from '../../redux/actions/templateActions';
import { GET_ONE_TEMPLATE, SET_CUSTOM_FIELDS, TEMPLATE_LOADING } from '../../redux/actions/action-types';
import { failure } from '../../redux/actions/snackbarActions';

// Utils
import { drawRestrictedAreaOnPage, getFileAsBlob } from '../../utils/template-builder';
import { addElementsforRealPennedLetters } from '../../utils/templateRestrictedArea/realPenned';
import { DPI, multiPageLetters } from '../../utils/constants';

// @ts-ignore
import fonts from "../../utils/fonts.json";
// @ts-ignore
import LexiRegularFont from "../../assets/Fonts/Lexi-Regular.ttf";

// Components
import TopNavigation from '../TopNavigation';
import SidePanel from '../SidePanel';
import Typography from '../GenericUIBlocks/Typography';
import GenericSnackbar from '../GenericUIBlocks/GenericSnackbar';

import './styles.scss';

// utils
import {MESSAGES} from '../../utils/message';

setUploadFunc(uploadFile)
/**
 * This code defines a React functional component called `TemplateBuilder` that is responsible for rendering a template builder interface.
 * It includes various useEffect hooks to handle component lifecycle events and state updates.
 * The component uses the `polotno` library to create a canvas workspace where users can design templates.
 * It also includes a side panel with different sections for adding and customizing elements on the canvas.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.store - The store object passed as a prop to the `TemplateBuilder` component.
 * @param {Object} props.styles - The styles contain CSS Properties passed as a prop to the `TemplateBuilder` component.
 * @returns {JSX.Element} The rendered template builder interface.
 */

interface TemplateBuilderProps {
  store: StoreType,
  platformName?: string | null;
  createTemplateRoute?: string | null,
  olcTemplate?: Record<string, any>;
  defaultCategory?: string[];
  onReturnAndNavigate?: () => void;
  onGetCustomFields?: () => Promise<any>;
  onGetOneTemplate?: (payload: any) => Promise<any>;
  onGetTemplates?: (payload: any) => Promise<any>;
  onSubmit?: (payload: any) => Promise<any>;
}

const TemplateBuilder: React.FC<TemplateBuilderProps> = ({ store, onReturnAndNavigate, platformName, defaultCategory, createTemplateRoute, olcTemplate, onGetOneTemplate, onGetCustomFields, onGetTemplates, onSubmit }) => {
  const [isStoreUpdated, setIsStoreUpdated] = useState(false);
  const [switchTabCount, setSwitchTabCount] = useState(1);

  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const template = useSelector((state: RootState) => state.templates.template) as Record<string, any>;
  const product = useSelector((state: RootState) => state.templates.product) as Record<string, any>;
  const envelopeType = useSelector(
    (state: RootState) => state.templates.envelopeType
  );

  const currentTemplateType = product?.productType;

  const containerStyle =
  {
    width: '100vw',
    height: '90vh',
    position: 'relative',
  }
  
  useEffect(() => {
    if (olcTemplate) {
      handleLoadTemplate();
    }
  }, [olcTemplate]);

  // Event listener for visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setSwitchTabCount((prev) => prev + 1);
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!product && !olcTemplate && !id) {
      navigate(createTemplateRoute || '/create-template');
    }
  }, []);

  // @ts-ignore
  useEffect(() => {
    if (product || (id && onGetOneTemplate)) {
      setGoogleFonts(fonts);

      if (id && onGetOneTemplate) {
        try {
          onGetOneTemplate(id).then((template) => {
            if (template) {
              dispatch({ type: GET_ONE_TEMPLATE, payload: { data: template } });
              dispatch({ type: TEMPLATE_LOADING, payload: true });
            } else {
              dispatch(failure('Unable to load the Template'));
              setTimeout(() => {
                navigate(createTemplateRoute || '/create-template');
              }, 1000);
            }
          });
        } catch (error) {
          return error;
        }
        // @ts-ignore
      } else if (store.pages.length === 0 && !olcTemplate) {
        createInitialPage();
      }

      fetchCustomFields();

      const handleChange = () => {
        if (!isStoreUpdated) {
          setIsStoreUpdated(true);
        }
      };

      const off = store.on("change", handleChange);

      return () => {
        store.history.clear();
        store.clear();
        off();
      };
    }
  }, []);

  useEffect(() => {
    if (!id && !olcTemplate && product && store.pages.length === 0) {
      createInitialPage();
    }
  }, [product]);

  useEffect(() => {
    const handleBeforeUnload = (event: { returnValue: string; }) => {
      const message = "Are you sure you want to leave?";
      event.returnValue = message;
      return message;
    };

    const addBeforeUnloadListener = () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("beforeunload", handleBeforeUnload);
    };

    const removeBeforeUnloadListener = () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };

    if (isStoreUpdated) {
      addBeforeUnloadListener();
    }

    return () => {
      removeBeforeUnloadListener();
    };
  }, [isStoreUpdated]);


  const fetchCustomFields = async () => {
    if (onGetCustomFields) {
      const customFields: any = await onGetCustomFields();
      if (customFields?.length) {
        dispatch({
          type: SET_CUSTOM_FIELDS,
          payload: customFields
        })
      }
    }
  }

  const createInitialPage = async () => {
    if (product) {

      store.addPage();
      const paperSize = product?.selectedSize?.split("x");
      store.setUnit({
        unit: "in",
        dpi: DPI,
      });
      store.setSize(+paperSize[1] * DPI, +paperSize[0] * DPI);
      if (multiPageLetters.includes(product.productType)) {
        store.addPage();
        store.selectPage(store.pages[0].id);
      }
      //@ts-ignore
      drawRestrictedAreaOnPage(store, product, envelopeType);

      if (currentTemplateType === "Real Penned Letter") {
        handleRealPennedLetters();
      }

      store.history.clear();
    }

    setIsStoreUpdated(false);
  };

  const handleRealPennedLetters = async () => {
    try {
      // Load Lexi Regular Fonts Into Store
      store.addFont({
        fontFamily: "lexi Regular",
        url: LexiRegularFont,
      });
      addElementsforRealPennedLetters(store);

      const response = await fetch(LexiRegularFont);
      const blob = await response.blob();

      const reader = new FileReader();
      // Load Lexi Regular Base64 into JSON
      reader.onloadend = () => {
        store.addFont({
          fontFamily: "lexi Regular",
          url: reader.result,
        } as any);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error loading the font file:", error);
    }
  };

  const handleLoadTemplate = async () => {
    const existingTemplate = olcTemplate;
    if (existingTemplate) {
      dispatch({ type: GET_ONE_TEMPLATE, payload: { data: existingTemplate } });
      const workspaceElement = document.querySelector(
        ".polotno-workspace-container"
      );
      if (workspaceElement) {
        workspaceElement.classList.add("show-loader");
      }
      // @ts-ignore
      const paperDimensions = existingTemplate?.product?.paperSize.split('x');
      store.setUnit({
        unit: "in",
        dpi: 96,
      });
      store.setSize(+paperDimensions[1] * DPI, +paperDimensions[0] * DPI);
      let jsonData = await getFileAsBlob(existingTemplate?.templateUrl);
      if (template?.product?.productType === 'Real Penned Letter') {
        let clonedJson = JSON.stringify(jsonData).replace(/{{/g, "((").replace(/}}/g, "))");
        jsonData = JSON.parse(clonedJson);
      }
      store.loadJSON(jsonData);
      await store.waitLoading();
      setIsStoreUpdated(false);
      dispatch({ type: TEMPLATE_LOADING, payload: false });
      if (workspaceElement) {
        workspaceElement.classList.add("hide-loader");
      }
    }
  };

  // Incase of Real Penned Letters hide tooltip
  const Tooltip = () => null;

  return (
    <>
      <Typography className="hideTemplateBuilder">
        {MESSAGES.TEMPLATE_MESSAGE_ON_SMALL_SCREEN}
      </Typography>
      <div className="polotno-container">
        {switchTabCount > 0 && (
          <div className="builder-wrapper">
            <TopNavigation
              store={store}
              isStoreUpdated={isStoreUpdated}
              olcTemplate={olcTemplate}
              onReturnAndNavigate={onReturnAndNavigate}
              onSubmit={onSubmit}
            />

            <PolotnoContainer style={containerStyle}>
              <SidePanel
                store={store}
                currentTemplateType={currentTemplateType}
                platformName={platformName}
                defaultCategory={defaultCategory}
                onGetTemplates={onGetTemplates}
                onGetOneTemplate={onGetOneTemplate}
                onGetCustomFields={onGetCustomFields}
              />
              <WorkspaceWrap>
                {currentTemplateType !== 'Real Penned Letter' && (
                  <Toolbar store={store} downloadButtonEnabled={false} />
                )}
                {currentTemplateType !== 'Real Penned Letter' ? (
                  <Workspace store={store} pageControlsEnabled={false} />
                ) : (
                  <Workspace
                    store={store}
                    pageControlsEnabled={false}
                    components={{Tooltip}}
                  />
                )}
                <ZoomButtons store={store} />
              </WorkspaceWrap>
            </PolotnoContainer>
            <GenericSnackbar />
          </div>
        )}
      </div>
    </>
  );
};

export default TemplateBuilder;


