import React, { useEffect, useState } from "react";

//hooks
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//actions
import {
    clearTemplateFields,
    getAllProducts,
    searchAndAdvanceChange,
    selectPostCard,
    selectProduct,
} from "../../../redux/actions/template-builder";
import { CLEAR_TEMPLATE } from "../../../redux/actions/action-types.js";

//utils
import { PRODUCT_LEARN_URL, sortOrderForTemplates } from "../../utils/constants";
import { removeItem } from "../../utils/local-storage";
import { MESSAGES } from "../../utils/message";
import { envelopeTypes } from "../../utils/template-builder";

// Mui Components
import { GridContainer } from '../GenericUIBlocks/Grid';
import Typography from "../GenericUIBlocks/Typography";
import Button from "../GenericUIBlocks/Button";


// styles
import "./styles.scss";

// Images
import Postcard from "../../../assets/images/templates/postcard.svg";
import PersonalLetter from "../../../assets/images/templates/personal-letter.svg";
import ProfessionalLetter from "../../../assets/images/templates/professional-letter.svg";
import RealPennedLetter from "../../../assets/images/templates/real-penned-letters.svg";
import TriFoldSelfMailers from "../../../assets/images/templates/tri-fold-self-mailers.svg";
import BiFoldSelfMailers from "../../../assets/images/templates/bi-fold-self-mailers.svg";

import SizeImage from "../../../assets/images/templates/size-image.jsx";
import SizeImageMid from "../../../assets/images/templates/size-image-mid.jsx";
import SizeImageLarge from "../../../assets/images/templates/size-image-lg.jsx";


// import MultiSelect from "../../General/MultiSelect/index.jsx";

const CreateTemplate = () => {
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [envelopeType, setEnvelopeType] = useState([]);
    const title = useSelector((state) => state.templateReducer.title);
    const product = useSelector((state) => state.templateReducer.product);
    const products = useSelector((state) => state.templateReducer.products);
    const templateType = useSelector(
        (state) => state.templateReducer.templateType
    );

    const sortedProducts = products.sort((a, b) => {
        const indexA = sortOrderForTemplates.indexOf(a.productType);
        const indexB = sortOrderForTemplates.indexOf(b.productType);
        return indexA - indexB;
    });

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(clearTemplateFields());
        removeItem("formData");
        dispatch({ type: CLEAR_TEMPLATE });
    }, []);

    const handleNext = () => {
        const trimedTitle = title.trim();
        if (
            !trimedTitle ||
            trimedTitle.length > 50 ||
            !templateType ||
            !product ||
            (product &&
                product.productType === "Postcards" &&
                !product.selectedSize) ||
            (product &&
                product.productType === "Professional Letters" &&
                !envelopeType.length)
        ) {
            setIsError(true);
        } else {
            let envelope = "";
            if (product.productType === "Professional Letters") {
                envelope = envelopeTypes.find(
                    (envelope) => envelope.title === envelopeType[0]
                ).type;
            }
            dispatch(searchAndAdvanceChange("title", trimedTitle));
            dispatch(searchAndAdvanceChange("envelopeType", envelope));
            navigate(
                templateType === "json" ? "/template-builder" : "/template-html"
            );
        }
    };

    const Images = {
        Postcards: Postcard,
        "Professional Letters": ProfessionalLetter,
        "Personal Letters": PersonalLetter,
        "Real Penned Letter": RealPennedLetter,
        "Tri-Fold Self-Mailers": TriFoldSelfMailers,
        "Bi-Fold Self-Mailers": BiFoldSelfMailers,
    };

    useEffect(() => {
        if (products.length) {
            dispatch(selectProduct(products[0]));
        }
    }, [products]);

    useEffect(() => {
        if (product && product?.productType === "Professional Letters") {
            if (envelopeType[0] === "Non-Windowed Envelope") {
                dispatch(
                    selectProduct(sortedProducts.find((item) => item.windowed === false))
                );
            }
        }
    }, [envelopeType]);

    return (
        <div className="createTemplateMaindiv">
            <div maxWidth="xxl">
                <GridContainer container>
                    <GridContainer item lg={12} md={12} sm={12} xs={12}>
                        <div className="createTemplateHeader">
                            <Typography>Create New Template</Typography>
                            <div className="templateInputWrapper">
                                <Typography>Template Name*</Typography>
                                <input
                                    type="text"
                                    className={!title && isError ? "error" : ""}
                                    value={title}
                                    onChange={(e) => {
                                        dispatch(searchAndAdvanceChange("title", e.target.value))
                                    }
                                    }
                                    placeholder="Template Name"
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
                        {/* <Divider /> */}
                    </GridContainer>
                </GridContainer>
                <GridContainer container>
                    <GridContainer item lg={12} md={12} sm={12} xs={12}>
                        <div className="productTypeWrapper">
                            <div className="productHeading">
                                <Typography>Product Type*</Typography>
                                <NavLink to={PRODUCT_LEARN_URL}
                                    target="_blank"><Typography>Learn More</Typography></NavLink>
                            </div>
                            <div className="productsWrapper">
                                {sortedProducts.filter((prod) => prod.windowed !== false).map((prod, index) => {
                                    return (
                                        <div
                                            className={`productCard ${prod.productType === (product && product.productType)
                                                    ? "active"
                                                    : ""
                                                } ${isError && !product ? "error" : ""} `}
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
                        {/* <Divider /> */}
                    </GridContainer>
                </GridContainer>
                {product && product.productType === "Professional Letters" && (
                    <GridContainer container my={2} className="mb-5">
                        <GridContainer item lg={6} md={6} sm={6} xs={12}>
                            <div className="createTemplateHeader">
                                <div className="templateInputWrapper">
                                    <Typography>Envelope Type*</Typography>
                                    {/* <MultiSelect
                                        className={isError && !envelopeType.length ? "error" : ""}
                                        options={envelopeTypes}
                                        selectedValue={envelopeType}
                                        setSelectedValue={setEnvelopeType}
                                        productType={false}
                                        multiple={false}
                                        placeHolderText="Envelope Type"
                                    />
                                    {isError && !envelopeType.length && (
                                        <Typography mt={1} className="error-field">
                                            *{MESSAGES.TEMPLATE.ENVELOPE_TYPE_REQUIRED}
                                        </Typography>
                                    )} */}
                                </div>
                            </div>
                        </GridContainer>
                    </GridContainer>
                )}
                {product && product?.productType === "Postcards" && (
                    <GridContainer container>
                        <GridContainer item lg={12} md={12} sm={12} xs={12}>
                            <div className="postCardSizeWrapper">
                                <div className="postCardHeading">
                                    <Typography>Postcard Size*</Typography>
                                </div>
                                <div className="postCardWrapper">
                                    {product?.size
                                        .sort((a, b) => a.id.localeCompare(b.id))
                                        .map((type, index) => {
                                            const size = type.size.split("x");
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
                                                                "Postcards"
                                                            )
                                                        )
                                                    }
                                                    className={
                                                        index === 0
                                                            ? `postCard postCard-small ${product.selectedSize === type.size
                                                                ? "active"
                                                                : ""
                                                            }`
                                                            : index === 1
                                                                ? `postCard postCard-mid ${product.selectedSize === type.size
                                                                    ? "active"
                                                                    : ""
                                                                }`
                                                                : index === 2
                                                                    ? `postCard postCard-large ${product.selectedSize === type.size
                                                                        ? "active"
                                                                        : ""
                                                                    }`
                                                                    : `postCard ${product.selectedSize === type.size
                                                                        ? "active"
                                                                        : ""
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
                                    product.productType === "Postcards" &&
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
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                    <Button onClick={handleNext}>Next</Button>
                </div>
            </div>
        </div>
    );
};

export default CreateTemplate;
