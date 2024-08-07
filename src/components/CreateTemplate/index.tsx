import React, { ReactElement, useEffect, useState } from 'react';

//hooks
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

//actions
import {
  clearTemplateFields,
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
import GenericSnackbar from '../GenericUIBlocks/GenericSnackbar';

// Images
//@ts-ignore
import Postcard from '../../assets/images/templates/postcard.tsx';
//@ts-ignore
import PersonalLetter from '../../assets/images/templates/personal-letter.tsx';
//@ts-ignore
import ProfessionalLetter from '../../assets/images/templates/professional-letter.tsx';
//@ts-ignore
import RealPennedLetter from '../../assets/images/templates/real-penned-letters.tsx';
//@ts-ignore
import TriFoldSelfMailers from '../../assets/images/templates/tri-fold-self-mailers.tsx';
//@ts-ignore
import BiFoldSelfMailers from '../../assets/images/templates/bi-fold-self-mailers.tsx';

import SizeImage from '../../assets/images/templates/size-image';
import SizeImageMid from '../../assets/images/templates/size-image-mid';
import SizeImageLarge from '../../assets/images/templates/size-image-lg';
import Input from '../GenericUIBlocks/Input';
import Divider from '../GenericUIBlocks/Divider';

// styles
import './styles.scss';

const templateHeadingStyles: React.CSSProperties = {
  color: `var(--primary-color)`,
  fontSize: `24px`,
  fontStyle: `normal`,
  fontWeight: `600`,
  lineHeight: `normal`,
  marginBottom: `20px`,
};

const templateTextStyles: React.CSSProperties = {
  color: `var(--text-color)`,
  fontSize: `14px`,
  fontStyle: `normal`,
  fontWeight: `400`,
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
  backgroundColor: 'transparent',
  color: `var(--text-color)`,
  fontSize: `14px`,
  fontWeight: `500`,
};

const Images: Record<string, ReactElement> = {
  Postcards: <Postcard fill="var(--svg-color)" />,
  'Professional Letters': <ProfessionalLetter fill="var(--svg-color)" />,
  'Personal Letters': <PersonalLetter fill="var(--svg-color)" />,
  'Real Penned Letter': <RealPennedLetter fill="var(--svg-color)" />,
  'Tri-Fold Self-Mailers': <TriFoldSelfMailers fill="var(--svg-color)" />,
  'Bi-Fold Self-Mailers': <BiFoldSelfMailers fill="var(--svg-color)" />,
};

interface CreateTemplateProps {
  onReturnAndNavigate?: () => void;
  createTemplateRoute?: string | null;
  templateBuilderRoute?: string | null;
}

const CreateTemplate: React.FC<CreateTemplateProps> = ({ onReturnAndNavigate, createTemplateRoute, templateBuilderRoute }) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [envelopeType, setEnvelopeType] = useState<[]>([]);
  const [inputValue, setInputValue] = useState('');

  const title = useSelector((state: RootState) => state.templates.title) || '';
  const product = useSelector(
    (state: RootState) => state.templates.product
  ) as Record<string, any>;
  const products = useSelector((state: RootState) => state.templates.products);
  const templateType = useSelector(
    (state: RootState) => state.templates.templateType
  );

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
      let envelope: string | string[] = '';
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
        templateBuilderRoute ? templateBuilderRoute : '/template-builder'
      );
    }
  };

    useEffect(() => {
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
    <>
      <Typography className="hideTemplateBuilder">
        {MESSAGES.TEMPLATE_MESSAGE_ON_SMALL_SCREEN}
      </Typography>
      <div className="createTemplateMaindiv">
        <div>
          <GridContainer>
            <GridItem lg={6} md={6} sm={12} xs={12}>
              <div className="createTemplateHeader">
                <Typography style={templateHeadingStyles}>
                  {MESSAGES.TEMPLATE.CREATE.TITLE}
                </Typography>
                <div className="templateInputWrapper">
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(e: any) => {
                      setInputValue(e.target.value);
                      dispatch(searchAndAdvanceChange('title', e.target.value));
                    }}
                    placeholder="Template Name"
                    inputIcon={false}
                    error={
                      !title.trim() && isError
                        ? MESSAGES.TEMPLATE.NAME_REQUIRED
                        : title.length > 50 && isError
                          ? MESSAGES.TEMPLATE.NAME_LESS_50
                          : ''
                    }
                    label={MESSAGES.TEMPLATE.CREATE.TEMPLATE_LABEL}
                  />
                </div>
              </div>
            </GridItem>
          </GridContainer>
          <Divider />
          <GridContainer>
            <GridItem lg={12} md={12} sm={12} xs={12}>
              <div className="productTypeWrapper">
                <div className="productHeading">
                  <Typography
                    style={{ ...templateTextStyles, marginBottom: '0px' }}
                  >
                    {MESSAGES.TEMPLATE.CREATE.PRODUCT_LABEL}
                  </Typography>
                  <NavLink to={PRODUCT_LEARN_URL} target="_blank">
                    <Typography>
                      {' '}
                      {MESSAGES.TEMPLATE.CREATE.LEARN_TEXT}
                    </Typography>
                  </NavLink>
                </div>
                <div
                  className="productsWrapper"
                  style={{
                    marginBottom:
                      product &&
                        (product.productType.includes('Postcards') || product.productType.includes('Professional Letters'))
                        ? undefined
                        : '100px',
                  }}
                >
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
                            {Images[prod.productType]}
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
          {product?.productType?.includes('Postcards') ||
          product?.productType?.includes('Professional Letters') ? (
            <Divider />
          ) : null}
          {product && product.productType === 'Professional Letters' && (
            <GridContainer>
              <GridItem lg={6} md={6} sm={12} xs={12}>
                <div className="templateSelectWrapper">
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
                    isError={isError && !Object.keys(envelopeType).length}
                    label="Envelope Type*"
                  />
                </div>
              </GridItem>
            </GridContainer>
          )}
          {product && product?.productType === 'Postcards' && product?.size && (
            <GridContainer>
              <GridItem lg={12} md={12} sm={12} xs={12}>
                <div className="postCardSizeWrapper">
                  <div className="postCardHeading">
                    <Typography style={templateTextStyles}>
                      Postcard Size*
                    </Typography>
                  </div>
                  <div className="postCardWrapper">
                    {product?.size
                      .sort((a: any, b: any) => a.id.localeCompare(b.id))
                      .map((type: any, index: any) => {
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
              </GridItem>
            </GridContainer>
          )}
        </div>
        <div className="footerBtns">
          <div className="createTemplateBtns">
            <Button
              style={{
                ...footerButtonStyles,
                border: '0.5px solid var(--border-color)',
              }}
              onClick={() =>
                onReturnAndNavigate ? onReturnAndNavigate() :  navigate(createTemplateRoute || '/create-template')
              }
            >
              {MESSAGES.TEMPLATE.CREATE.CANCEL_BUTTON}
            </Button>
            <Button
              style={{
                ...footerButtonStyles,
                color: '#ffffff',
                backgroundColor: 'var(--primary-color)',
              }}
              onClick={handleNext}
            >
              {MESSAGES.TEMPLATE.CREATE.SUBMIT_BUTTON}
            </Button>
          </div>
        </div>
        <GenericSnackbar />
      </div>
    </>
  );
};

export default CreateTemplate;
