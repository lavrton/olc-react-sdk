import React, { useEffect, useState } from 'react';

// Import Polotno and third-party libraries
import { PolotnoContainer, WorkspaceWrap } from 'polotno';
import { setUploadFunc } from 'polotno/config';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { Workspace } from 'polotno/canvas/workspace';
import { setGoogleFonts } from 'polotno/config';
import merge from 'deepmerge';

// Actions
import {
  getAllCustomFields,
  getOneTemplate,
  uploadFile,
} from '../../redux/actions/templateActions';
import { TEMPLATE_LOADING } from '../../redux/actions/action-types';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

// Utils
import { drawRestrictedAreaOnPage, getFileAsBlob } from '../../utils/template-builder';
import { addElementsforRealPennedLetters } from '../../utils/templateRestrictedArea/realPenned';
import { DPI, multiPageLetters } from '../../utils/constants';
import fonts from "../../utils/fonts.json";
import LexiRegularFont from "../../assets/Fonts/Lexi-Regular.ttf";

// Components
import TopNavigation from '../TopNavigation';
import SidePanel from '../SidePanel';

import './styles.scss';

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

// styles
import './styles.scss'
import { RootState } from '@/redux/reducers';
import { AppDispatch } from '@/redux/store';

interface Props {
  store: object | any,
  styles?: React.CSSProperties;
}

const TemplateBuilder = (props: Props) => {
  const { store, styles } = props;
  const [isStoreUpdated, setIsStoreUpdated] = useState(false);
  const [switchTabCount, setSwitchTabCount] = useState(1);

  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();


  const template = useSelector((state: RootState) => state.templates.template);
  const product = useSelector((state: RootState) => state.templates.product);
  const envelopeType = useSelector(
    (state: RootState) => state.templates.envelopeType
  );

  const currentTemplateType = product?.productType;


  const containerStyle = merge(
    {
      width: "100vw",
      height: "90vh",
      position: "relative",
    },
    styles || {}
  );

  useEffect(() => {
    handleLoadTemplate();
  }, [template]);

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
    if (!product) {
      navigate('/');
    }

    setGoogleFonts(fonts);
    // remove this component from the history stack

    if (id) {
      dispatch(getOneTemplate(id));
      dispatch(getAllCustomFields());
    } else if (store.pages.length === 0) {
      createInitialPage();
    }


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
  }, []);

  useEffect(() => {
    if (!id && product && store.pages.length === 0) {
      createInitialPage();
    }
  }, [product]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
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

  const createInitialPage = async () => {
    if (product) {

      store.addPage();
      const paperSize = product.selectedSize.split("x");
      store.setUnit({
        unit: "in",
        dpi: DPI,
      });
      store.setSize(+paperSize[1] * DPI, +paperSize[0] * DPI);
      if (multiPageLetters.includes(product.productType)) {
        store.addPage();
        store.selectPage(store.pages[0].id);
      }
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
        });
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error loading the font file:", error);
    }
  };

  const handleLoadTemplate = async () => {
    if (template) {
      const workspaceElement = document.querySelector(
        ".polotno-workspace-container"
      );
      if (workspaceElement) {
        workspaceElement.classList.add("show-loader");
      }
      const paperDimensions = template.product.paperSize.split('x');
      store.setUnit({
        unit: "in",
        dpi: 96,
      });
      store.setSize(+paperDimensions[1] * DPI, +paperDimensions[0] * DPI);
      const jsonData = await getFileAsBlob(template.templateUrl);
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
    <div className="polotno-container">
      {switchTabCount > 0 && (
        <div sx={{ display: { xs: "none", sm: "block" } }}>
          <TopNavigation
            store={store}
            isStoreUpdated={isStoreUpdated}
          />

          <PolotnoContainer
            style={containerStyle}
          >
            <SidePanel store={store} />
            <WorkspaceWrap>
              {currentTemplateType !== "Real Penned Letter" && (
                <Toolbar store={store} downloadButtonEnabled={false} />
              )}
              {currentTemplateType !== "Real Penned Letter" ? (
                <Workspace store={store} pageControlsEnabled={false} />
              ) : (
                <Workspace
                  store={store}
                  pageControlsEnabled={false}
                  components={{ Tooltip }}
                />
              )}
              <ZoomButtons store={store} />
            </WorkspaceWrap>
          </PolotnoContainer>
        </div>
      )}
    </div>
  );
};

export default TemplateBuilder;


