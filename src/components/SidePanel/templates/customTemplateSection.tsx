import React from 'react';
import { observer } from 'mobx-react-lite';
import { SectionTab, } from 'polotno/side-panel';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState} from 'react';
// import FaShapes from '@meronex/icons/fa/FaShapes';
import type { StoreType } from 'polotno/model/store';
import type { TemplatesSection } from 'polotno/side-panel';
import { fetchTemplates } from '../../../redux/actions/templateAction';
import { AppDispatch } from '../../../redux/store';
import DesignIcon from '../../../assets/images/templates/template-default-design.svg'
import dummyTemplateIcon from "../../../assets/images/templates/dummy-template.svg";
import Typography from '../../GenericUIBlocks/Typography';
import './styles.scss';
import Dialog from '../../GenericUIBlocks/Dialog';

type SideSection = typeof TemplatesSection;

const designDialogStyles = {
  maxWidth: "100%",
  minHeight: "400px"
}

const customTemplateSection: SideSection = {
  name: 'Templates',
  Tab: observer((props: { store: StoreType; active: boolean; onClick: () => void }) => (
    <SectionTab name="Templates" {...props}>
      {/* <FaShapes style={{ marginRight: 8 }} /> */}
      Custom
    </SectionTab>
  )) as SideSection['Tab'],
  Panel: observer(({ store }) => {
    const dispatch: AppDispatch = useDispatch(); 
    const [selectedRecord, setSelectedRecord] = useState(null);
    const templates = useSelector((state: any) => state.templates.templates);
    const [isShowDialog, setIsShowDialog] = useState({
      open: false,
      model: "",
    });
  
    useEffect(() => {
      dispatch(fetchTemplates());
    }, [dispatch]);
    
    const handleLoadTemplateModel = (record: any) => {
      setSelectedRecord(record);
      handleDialogChange("load-template");
    }

    // const envelopeType = useSelector(
    //   (state) => state.templateReducer.envelopeType
    // );
    // const templateLoading = useSelector(
    //   (state) => state.templateReducer.templateLoading
    // );

    // const getTemplatesByTab = async () => {
    //   let payload = {
    //     tab:
    //       currentTemplateType?.id === "1"
    //         ? "my-templates"
    //         : currentTemplateType?.id === "2"
    //           ? "team-templates"
    //           : "olc-templates",
    //     page: 1,
    //     pageSize: 500,
    //     productId: product?.id,
    //   };
    //   search.length ? (payload.search = search) : undefined;
    //   currentTemplateType?.id === "3" ?  payload.categoryIds = selectedCategory?.id.split() : undefined;
    //   const templates = await getAllTemplatesByTab(payload);
    //   if (templates.status === 200) {
    //     if (currentTemplateType?.id === "1") {
    //       setMyTemplates(templates?.data?.data?.rows);
    //     } else if (currentTemplateType?.id === "2") {
    //       setTeamTemplates(templates?.data?.data?.rows);
    //     } else {
    //       setOlcTemplates(templates?.data?.data?.rows);
    //     }
    //   }
    // };


    // const getAllCategories = async () => {
    //   const categories = await dispatch(getAllTemplateCategories);
    //   if (categories.status === 200) {
    //     setTemplateCategories(
    //       categories.data.data
    //         .filter((item) => item.totalTemplates > 0)
    //         .map((item) => ({
    //           ...item,
    //           label: item.title,
    //         }))
    //     );
    //   }
    // };

    // const handleSearch = () => {
    //   if (search) {
    //     setSearchApplied(true);
    //     getTemplatesByTab();
    //   }
    // };

    // const searchKeyDown = (event) => {
    //   if (event.key === "Enter") {
    //     handleSearch();
    //   }
    // };

    const handleLoadAllTemplate = (pagination = false, initialCall = false) => {
      let page = pagination ? ++templates.currentPage : templates.currentPage;
      if (initialCall) {
        page = 1;
      }
      // dispatch(
      //   getAllTemplates(
      //     page,
      //     10,
      //     null,
      //     null,
      //     null,
      //     "json",
      //     product ? product.id : null,
      //     initialCall,
      //     true
      //   )
      // );
    };

    const handleLoadTemplate = (id) => {
      dispatch(getOneTemplate(id, "copy"));
      handleDialogChange("");
    };

    const handleDialogChange = (model = "") => {
      setIsShowDialog((prev) => ({ open: !prev.open, model: model }));
    };

    // const processPage = async (index, page) => {
    //   return new Promise((resolve, reject) => {
    //     let pageNumber = page.children.find(
    //       (el) => el.custom?.name === "page-number"
    //     );
    //     const text = index === 0 ? "Front" : "Back";

    //     if (pageNumber) {
    //       pageNumber.set({ text });
    //       resolve(); // Resolve the promise if the update is successful
    //     } else {
    //       page.addElement({
    //         type: "text",
    //         custom: { name: "page-number" },
    //         text,
    //         width: store.width,
    //         align: "center",
    //         fontSize: 40,
    //         x: -150,
    //         y: -50,
    //         selectable: false,
    //         alwaysOnTop: true,
    //       });
    //       resolve(); // Resolve the promise after adding the element
    //     }
    //   });
    // };

    // const checkPageNumbers = async () => {
    //   const promises = store.pages.map(async (page, index) => {
    //     await processPage(index, page);
    //   });

    //   await Promise.all(promises); // Wait for all promises to resolve
    // };

    const handleClearStore = () => {
      store.clear();
      let size = "";
      let isPostCards = false;
      let _product = product;
      if (template) {
        size = template.product.paperSize;
        isPostCards = template.product.productType === "Postcards" || false;
        _product = template.product;
      } else if (product) {
        size = product.selectedSize;
        isPostCards = product.productType === "Postcards" || false;
      }
      store.setUnit({
        unit: "in",
        dpi: DPI,
      });
      size = size.split("x");
      store.setSize(+size[1] * DPI, +size[0] * DPI);
      store.addPage();

      if (multiPageLetters.includes(_product.productType)) {
        store.addPage();
        store.selectPage(store.pages[0].id);
        // if(_product.productType===multiPageLetters[0]){
        //     checkPageNumbers();
        // }
      }
      drawRestrictedAreaOnPage(store, product, envelopeType);
      handleDialogChange("");
    };

    // const handleLoadTemplateModel = (record) => {
    //   setSelectedRecord(record);
    //   handleDialogChange("load-template");
    // };

    // useEffect(() => {
    //   if (templateLoading !== null && templateLoading === false) {
    //     handleDialogChange("");
    //     dispatch({ type: TEMPLATE_LOADING, payload: null });
    //   }
    // }, [templateLoading]);

    // useEffect(() => {
    //   if (!search) {
    //     setSearchApplied(false);
    //     setSearch("");
    //     getTemplatesByTab();
    //   }
    // }, [search]);

    // useEffect(() => {
    //   handleLoadAllTemplate(true, true);
    //   getAllCategories();
    //   return () => {
    //     dispatch(clearAllTemplates());
    //   };
    // }, []);

    // useEffect(() => {
    //   getTemplatesByTab();
    // }, [currentTemplateType, selectedCategory]);

    // useEffect(() => {
    //   const div = document.querySelector(".polotno-panel-container");
    //   const handleScroll = () => {
    //     if (div) {
    //       const isAtBottom =
    //         div.scrollTop + div.clientHeight >= div.scrollHeight;
    //       const isNeedToLoadMore =
    //         templates.currentPage * templates.perPage < templates.count;
    //       if (isAtBottom && !templatesPagination.loading && isNeedToLoadMore) {
    //         handleLoadAllTemplate(true);
    //       }
    //     }
    //   };

    //   if (div) {
    //     div.removeEventListener("scroll", handleScroll);
    //     div.addEventListener("scroll", handleScroll);
    //   }
    //   return () => {
    //     div.removeEventListener("scroll", handleScroll);
    //   };
    // }, [templates]);


    return (
      <div className="custom-template-section">
        {isShowDialog.open && isShowDialog.model === 'design-own' && (
          <Dialog
            title="Confirm"
            subHeading="Are you sure you want to discard these changes?"
            description="You will lose your changes. Please save your changes or click ok to proceed."
            open={isShowDialog.open}
            handleClose={() => handleDialogChange('')}
            handleOk={handleClearStore}
            customStyles={designDialogStyles}
          />
        )}
        {isShowDialog.open && isShowDialog.model === 'load-template' && (
          <Dialog
            title="Confirm"
            subHeading="Are you sure you want to change current template with this one?"
            description="You will lose your changes. Please save your changes or click ok to proceed."
            open={isShowDialog.open}
            handleClose={() => handleDialogChange('')}
            handleOk={() => handleLoadTemplate(selectedRecord.id)}
          />
        )}
        <div
          className="templateTabsWrapper"
          style={{
            maxWidth: window.innerWidth <= 600 ? '320px' : '480px',
            backgroundColor: '#fff',
          }}
        >
          {/* <Box sx={{ mt: 1 }}>
            <GenericAutocomplete
              placeholder="Template Types"
              options={templateTypes}
              setSelectedValue={setCurrentTemplateType}
              selectedValue={currentTemplateType}
              search={() => {}}
              updateErrors={() => {}}
              disableClearable={true}
              templateBuilder={true}
            />
          </Box> */}
          {/* {currentTemplateType?.id === "3" && (
            <Box sx={{ mt: 1 }}>
              <GenericAutocomplete
                placeholder="Select Category"
                options={templateCategories}
                setSelectedValue={setSelectedCategory}
                selectedValue={selectedCategory}
                search={() => {}}
                updateErrors={() => {}}
                disableClearable={false}
                templateBuilder={true}
              />
            </Box>
          )} */}
          {/* <Box className="searchWrapper" sx={{ mt: 2, mb: 2 }}>
            <Input
              className={`searchInput ${searchApplied ? "searchApplied" : ""}`}
              type="text"
              autoComplete="off"
              value={search}
              name="search"
              onKeyDown={searchKeyDown}
              onChange={(e) => setSearch(e.target.value.trimStart())}
              placeholder={MESSAGES.TEMPLATE.TEMPLATE_SEARCH_PLACE_HOLDER}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    className="searchIcon"
                    onClick={handleSearch}
                  >
                    <img src={Search} alt="search" />
                  </IconButton>
                </InputAdornment>
              }
            />
            {searchApplied && (
              <HighlightOffIcon
                onClick={() => {
                  setSearch(null);
                  setSearchApplied(false);
                }}
                className="clearSerach"
              />
            )}
          </Box> */}
          {/* {currentTemplateType?.id === "1" ? ( */}
          <>
            <div
              className="default-design"
              onClick={() => handleDialogChange('design-own')}
            >
              <img src={DesignIcon} alt="design" />
              <Typography>Design Your Own</Typography>
            </div>
            {templates.rows.length ? (
              templates.rows.map((template: any, i: number) => (
                <div
                  className="design-template"
                  key={i}
                  onClick={() => handleLoadTemplateModel(template)}
                >
                  <img
                    src={template.thumbnailUrl}
                    alt={template.title}
                    onError={({currentTarget}) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = dummyTemplateIcon;
                      currentTarget.classList.add('dummy-image');
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="noTemplateText">
                <Typography>No My Templates to show</Typography>
              </div>
            )}
          </>
          {/* ) : currentTemplateType?.id === "2" ? (
            <>
              {teamTemplates.length ? (
                teamTemplates?.map((template, i) => (
                  <div
                    className="design-template"
                    key={i}
                    onClick={() => handleLoadTemplateModel(template)}
                  >
                    <img
                      src={template.thumbnailUrl}
                      alt={template.title}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = dummyTemplateIcon;
                        currentTarget.classList.add("dummy-image");
                      }}
                    />
                  </div>
                ))
              ) : (
                <Box className="noTemplateText">
                  <Typography>No Team Templates to show</Typography>
                </Box>
              )}
            </>
          ) : currentTemplateType?.id === "3" ? (
            <>
              {olcTemplates.length ? (
                olcTemplates?.map((template, i) => (
                  <div
                    className="design-template"
                    key={i}
                    onClick={() => handleLoadTemplateModel(template)}
                  >
                    <img
                      src={template.thumbnailUrl}
                      alt={template.title}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = dummyTemplateIcon;
                        currentTarget.classList.add("dummy-image");
                      }}
                    />
                  </div>
                ))
              ) : (
                <Box className="noTemplateText">
                  <Typography>No OLC Templates to show</Typography>
                </Box>
              )} 
              </> 
          ) : null} */}
        </div>
      </div>
    );
   }) as SideSection['Panel'],
};

export default customTemplateSection;
