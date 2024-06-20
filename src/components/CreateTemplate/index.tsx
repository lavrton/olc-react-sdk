import React, { useEffect, useState } from 'react';

//hooks
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

//actions
import {
  clearTemplateFields,
  getAllProducts,
  searchAndAdvanceChange,
  selectPostCard,
  selectProduct,
} from '../../redux/actions/templateActions';
import { CLEAR_TEMPLATE } from '../../redux/actions/action-types';

//utils
import { PRODUCT_LEARN_URL, sortOrderForTemplates } from '../../utils/constants';
import { removeItem } from '../../utils/local-storage';
import { MESSAGES } from '../../utils/message';
import { envelopeTypes } from '../../utils/template-builder';

// UI Components
import { GridContainer, GridItem } from '../GenericUIBlocks/Grid';
import Typography from '../GenericUIBlocks/Typography';
import Button from '../GenericUIBlocks/Button';
import GeneralSelect from '../GenericUIBlocks/GeneralSelect';

// Images
//@ts-ignore
import Postcard from '../../assets/images/templates/postcard.svg';
//@ts-ignore
import PersonalLetter from '../../assets/images/templates/personal-letter.svg';
//@ts-ignore
import ProfessionalLetter from '../../assets/images/templates/professional-letter.svg';
//@ts-ignore
import RealPennedLetter from '../../assets/images/templates/real-penned-letters.svg';
//@ts-ignore
import TriFoldSelfMailers from '../../assets/images/templates/tri-fold-self-mailers.svg';
//@ts-ignore
import BiFoldSelfMailers from '../../assets/images/templates/bi-fold-self-mailers.svg';

import SizeImage from '../../assets/images/templates/size-image';
import SizeImageMid from '../../assets/images/templates/size-image-mid';
import SizeImageLarge from '../../assets/images/templates/size-image-lg';
import Input from '../GenericUIBlocks/Input';
import Divider from '../GenericUIBlocks/Divider';

// styles
import './styles.scss';

const templateHeadingStyles: React.CSSProperties = {
  color: `#ed5c2f`,
  fontFamily: `Inter`,
  fontSize: `24px`,
  fontStyle: `normal`,
  fontWeight: `700`,
  lineHeight: `normal`,
  marginBottom: `20px`,
};

const templateTextStyles: React.CSSProperties = {
  color: `#000`,
  fontFamily: `Inter`,
  fontSize: `14px`,
  fontStyle: `normal`,
  fontWeight: `500`,
  lineHeight: `normal`,
  marginBottom: `16px`,
};

const footerButtonStyles: React.CSSProperties = {
  width: '100%',
  maxWidth: '100px',
  height: '100%',
  minHeight: '40px',
  textTransform: 'capitalize',
  borderRadius: '3px',
  backgroundColor: '#FFFFFF',
  color: '#000000',
};

const Images: Record<string, string> = {
  Postcards: Postcard,
  'Professional Letters': ProfessionalLetter,
  'Personal Letters': PersonalLetter,
  'Real Penned Letter': RealPennedLetter,
  'Tri-Fold Self-Mailers': TriFoldSelfMailers,
  'Bi-Fold Self-Mailers': BiFoldSelfMailers,
};

const CreateTemplate: React.FC = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [envelopeType, setEnvelopeType] = useState<[]>([]);

  const title = useSelector((state: RootState) => state.templates.title);
  const product = useSelector((state: RootState) => state.templates.product) as Record<string, any>;
  const products = useSelector((state: RootState) => state.templates.products);
  const templateType = useSelector((state: RootState) => state.templates.templateType);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const sortedProducts = products?.sort((a, b) => {
    const indexA = sortOrderForTemplates.indexOf(a.productType);
    const indexB = sortOrderForTemplates.indexOf(b.productType);
    return indexA - indexB;
  });

  const handleNext = () => {
    const trimedTitle = title.trim();
    if (
      !trimedTitle ||
      trimedTitle?.length > 50 ||
      !templateType ||
      !product ||
      (product &&
        product.productType === 'Postcards' &&
        !product?.selectedSize) ||
      (product &&
        product.productType === 'Professional Letters' &&
        !Object.keys(envelopeType).length)
    ) {
      setIsError(true);
    } else {
      let envelope: string | string[]  = "";
      if (product.productType === 'Professional Letters') {
        //@ts-ignore
        envelope = envelopeTypes.find(
        //@ts-ignore
          (envelope) => envelope?.label === envelopeType.label
        )?.type;
      }
      dispatch(searchAndAdvanceChange('title', trimedTitle));
      dispatch(searchAndAdvanceChange('envelopeType', envelope));
      navigate(
        templateType === 'json' ? '/template-builder' : '/template-html'
      );
    }
  };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(clearTemplateFields());
    removeItem('formData');
    dispatch({ type: CLEAR_TEMPLATE });
  }, []);

  useEffect(() => {
    if (products?.length) {
      dispatch(selectProduct(products[0]));
    }
  }, [products]);

  useEffect(() => {
    if (product && product?.productType === 'Professional Letters') {
      if (Object.keys(envelopeType).length) {
        setIsError(false);
      }
      //@ts-ignore
      if (envelopeType?.label === 'Non-Windowed Envelope') {
        dispatch(
          selectProduct(sortedProducts.find((item) => item.windowed === false))
        );
      }
    }
  }, [envelopeType]);

  return (
    <div className="createTemplateMaindiv">
      <div>
        <GridContainer>
          <GridItem lg={5} md={12} sm={12} xs={12}>
            <div className="createTemplateHeader">
              <Typography style={templateHeadingStyles}>
                {MESSAGES.TEMPLATE.CREATE.TITLE}
              </Typography>
              <div className="templateInputWrapper">
                <Typography style={templateTextStyles}>
                  {MESSAGES.TEMPLATE.CREATE.TEMPLATE_LABEL}
                </Typography>
                <Input
                  type="text"
                  value={title}
                  onChange={(e: any) => {
                    dispatch(searchAndAdvanceChange('title', e.target.value));
                  }}
                  placeholder="Template Name"
                  inputIcon={false}
                />
                {!title.trim() && isError && (
                  <Typography className="error-field">
                    *{MESSAGES.TEMPLATE.NAME_REQUIRED}
                  </Typography>
                )}
                {title.length > 50 && isError && (
                  <Typography className="error-field">
                    *{MESSAGES.TEMPLATE.NAME_LESS_50}
                  </Typography>
                )}
              </div>
            </div>
          </GridItem>
        </GridContainer>
        <Divider />
        <GridContainer>
          <GridItem lg={12} md={12} sm={12} xs={12}>
            <div className="productTypeWrapper">
              <div className="productHeading">
                <Typography style={templateTextStyles}>
                  {MESSAGES.TEMPLATE.CREATE.PRODUCT_LABEL}
                </Typography>
                <NavLink to={PRODUCT_LEARN_URL} target="_blank">
                  <Typography>  {MESSAGES.TEMPLATE.CREATE.LEARN_TEXT}</Typography>
                </NavLink>
              </div>
              <div className="productsWrapper">
                {sortedProducts &&
                  sortedProducts
                    ?.filter((prod) => prod.windowed !== false)
                    .map((prod, index) => {
                      return (
                        <div
                          className={`productCard ${prod.productType ===
                            (product && product.productType)
                            ? 'active'
                            : ''
                            } ${isError && !product ? 'error' : ''} `}
                          key={index}
                          onClick={() => dispatch(selectProduct(prod))}
                        >
                          <img src={Images[prod.productType]} alt="Postcard" />
                          <Typography>{prod.productType}</Typography>
                        </div>
                      );
                    })}
              </div>
              {isError && !product && (
                <Typography className="error-field">
                  *{MESSAGES.TEMPLATE.PRODUCT_TYPE_REQUIRED}
                </Typography>
              )}
            </div>
          </GridItem>
        </GridContainer>
        <Divider />
        {product && product.productType === 'Professional Letters' && (
          <GridContainer>
            <GridItem lg={6} md={6} sm={6} xs={12}>
              <div className="createTemplateHeader">
                <div className="templateInputWrapper">
                  {/* <Typography>Envelope Type*</Typography> */}
                  <GeneralSelect
                    className={isError && ![envelopeType].length ? 'error' : ''}
                    //@ts-ignore
                    selectedValue={envelopeType}
                      //@ts-ignore
                    setSelectedValue={setEnvelopeType}
                      //@ts-ignore
                    options={envelopeTypes}
                    placeholder="Envelope Type"
                    error={MESSAGES.TEMPLATE.ENVELOPE_TYPE_REQUIRED}
                    isError={isError}
                    label="Envelope Type*"
                  />
                </div>
              </div>
            </GridItem>
          </GridContainer>
        )}
        {product && product?.productType === 'Postcards' && (
          <GridContainer container>
            <GridContainer item lg={12} md={12} sm={12} xs={12}>
              <div className="postCardSizeWrapper">
                <div className="postCardHeading">
                  <Typography>Postcard Size*</Typography>
                </div>
                <div className="postCardWrapper">
                  {product?.size
                    .sort((a: any, b: any) => a.id.localeCompare(b.id))
                    .map((type :any, index: any) => {
                      const size = type.size.split('x');
                      return (
                        <div
                          onClick={() =>
                            dispatch(
                              selectPostCard(
                                {
                                  ...type,
                                  size: product.size,
                                  selectedSize: type.size,
                                },
                                'Postcards'
                              )
                            )
                          }
                          className={
                            index === 0
                              ? `postCard postCard-small ${product.selectedSize === type.size
                                ? 'active'
                                : ''
                              }`
                              : index === 1
                                ? `postCard postCard-mid ${product.selectedSize === type.size
                                  ? 'active'
                                  : ''
                                }`
                                : index === 2
                                  ? `postCard postCard-large ${product.selectedSize === type.size
                                    ? 'active'
                                    : ''
                                  }`
                                  : `postCard ${product.selectedSize === type.size
                                    ? 'active'
                                    : ''
                                  }`
                          }
                          key={index}
                        >
                          <Typography>
                            {size[0]}” x {size[1]}"
                          </Typography>
                          {index === 0 ? (
                            <SizeImage />
                          ) : index === 1 ? (
                            <SizeImageMid />
                          ) : (
                            <SizeImageLarge />
                          )}
                        </div>
                      );
                    })}
                </div>
                {isError &&
                  product &&
                  product.productType === 'Postcards' &&
                  !product.selectedSize && (
                    <Typography className="error-field">
                      *{MESSAGES.TEMPLATE.POSTCARD_SIZE_REQUIRED}
                    </Typography>
                  )}
              </div>
            </GridContainer>
          </GridContainer>
        )}
      </div>
      <div className="footerBtns">
        <div className="createTemplateBtns">
          <Button
            style={{
              ...footerButtonStyles,
              border: '0.5px solid rgba(0, 0, 0, 0.5)',
            }}
            onClick={() => navigate(-1)}
          >
            {MESSAGES.TEMPLATE.CREATE.CANCEL_BUTTON}
          </Button>
          <Button
            style={{
              ...footerButtonStyles,
              color: '#ffffff',
              backgroundColor: '#ed5c2f',
            }}
            onClick={handleNext}
          >
            {MESSAGES.TEMPLATE.CREATE.SUBMIT_BUTTON}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplate;
