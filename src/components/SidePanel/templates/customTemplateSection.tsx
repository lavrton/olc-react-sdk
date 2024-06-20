import React, { useEffect , useState} from 'react';
import { observer } from 'mobx-react-lite';
import { SectionTab, } from 'polotno/side-panel';
import { useDispatch, useSelector } from 'react-redux';
import type { StoreType } from 'polotno/model/store';
import type { TemplatesSection } from 'polotno/side-panel';
import {
  clearAllTemplates,
  getAllTemplates,
  getOneTemplate,
  getAllTemplateCategories,
  getAllTemplatesByTab,
} from '../../../../src/redux/actions/templateActions';
import { AppDispatch, RootState } from '../../../redux/store';
import DesignIcon from '../../../assets/images/templates/template-default-design.svg'
import dummyTemplateIcon from "../../../assets/images/templates/dummy-template.svg";
import CustomTemplate from '../../../assets/images/templates/custom-template';
import Search from "../../../assets/images/templates/contact-search.svg";
import Typography from '../../GenericUIBlocks/Typography';
import './styles.scss';
import Dialog from '../../GenericUIBlocks/Dialog';
import { multiPageLetters, templateTypes, DPI } from '../../../utils/constants';
import { drawRestrictedAreaOnPage } from "../../../utils/template-builder";
import GeneralSelect from '../../GenericUIBlocks/GeneralSelect'
import Input from '../../GenericUIBlocks/Input'
import ModalCross from '../../../assets/images/modal-icons/modal-cross';
import { MESSAGES } from '../../../utils/message';
import { TEMPLATE_LOADING } from '../../../redux/actions/action-types'

type SideSection = typeof TemplatesSection;

const designDialogStyles = {
  maxWidth: "600px",
  minHeight: "270px"
}


type Payload = {
  tab: string;
  page: number;
  pageSize: number;
  productId: string | null;
  search?: string;
  categoryIds?: string[];
};

type TemplateType = {
  id: string;
  name: string;
};

type TemplateCategory = {
  id: string;
  title: string;
  totalTemplates: number;
  label?: string;
};

type TemplateRecord = {
  id: string;
  thumbnailUrl: string;
  title: string;
};

const customTemplateSection: SideSection = {
  name: 'Templates',
  Tab: observer((props: { store: StoreType; active: boolean; onClick: () => void }) => (
    <SectionTab name="Templates" {...props}>
      <CustomTemplate/>
    </SectionTab>
  )) as SideSection['Tab'],
  Panel: observer(({ store }) => {
    const dispatch: AppDispatch = useDispatch(); 

    const [currentTemplateType, setCurrentTemplateType] = useState<TemplateType>(templateTypes[0]);
    const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | null>(null);
    const [selectedRecord, setSelectedRecord] = useState<TemplateRecord | null>(null);
    const [templateCategories, setTemplateCategories] = useState<TemplateCategory[]>([]);
    const [myTemplates, setMyTemplates] = useState<TemplateRecord[]>([]);
    const [teamTemplates, setTeamTemplates] = useState<TemplateRecord[]>([]);
    const [olcTemplates, setOlcTemplates] = useState<TemplateRecord[]>([]);
    const [searchApplied, setSearchApplied] = useState(false);
    const [search, setSearch] = useState("");

    const templates = useSelector((state: RootState) => state.templates.templates) as Record<string, any>;
    const template = useSelector((state: RootState) => state.templates.template) as Record<string, any> ;
    const templatesPagination = useSelector(
      (state: any) => state.templates.templatesPagination
    );
    const product = useSelector((state: any) => state.templates.product);
    const envelopeType = useSelector(
      (state: RootState) => state.templates.envelopeType
    );
    const templateLoading = useSelector(
      (state: RootState) => state.templates.templateLoading
    );

    const [isShowDialog, setIsShowDialog] = useState({
      open: false,
      model: "",
    });
  
    useEffect(() => {
      dispatch(getAllTemplates());
      
    }, []);

    const handleLoadTemplateModel = (record: any) => {
      setSelectedRecord(record);
      handleDialogChange("load-template");
    }

    const getTemplatesByTab = async () => {
      const payload: Payload = {
        tab:
          currentTemplateType?.id === "1"
            ? "my-templates"
            : currentTemplateType?.id === "2"
              ? "team-templates"
              : "olc-templates",
        page: 1,
        pageSize: 500,
        productId: product?.id,
      };
      search.length ? (payload.search = search) : undefined;
      currentTemplateType?.id === "3" ? payload.categoryIds = selectedCategory?.id.split(',') : undefined;

      const templates = await getAllTemplatesByTab(payload);
      if (templates.status === 200) {
        if (currentTemplateType?.id === "1") {
          setMyTemplates(templates?.data?.data?.rows);
        } else if (currentTemplateType?.id === "2") {
          setTeamTemplates(templates?.data?.data?.rows);
        } else {
          setOlcTemplates(templates?.data?.data?.rows);
        }
      }
    };


    const getAllCategories = async () => {
      const categories: Record<string, any> = await dispatch(getAllTemplateCategories);
      if (categories?.status === 200) {
        setTemplateCategories(
          categories?.data?.data
            .filter((item: any) => item.totalTemplates > 0)
            .map((item : any) => ({
              ...item,
              label: item.title,
            }))
        );
      }
    };

    const handleSearch = () => {
      if (search) {
        setSearchApplied(true);
        getTemplatesByTab();
      }
    };

    const searchKeyDown = (event: any) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };

    const handleLoadAllTemplate = (pagination = false, initialCall = false) => {
      let page = pagination ? ++templates.currentPage : templates.currentPage;
      if (initialCall) {
        page = 1;
      }
      dispatch(
        getAllTemplates(
          page,
          10,
          null as unknown as string,
          null as unknown as string,
          null as unknown as string,
          "json",
          product ? product.id : null,
          initialCall,
          true
        )
      );
    };

    const handleLoadTemplate = (id: any) => {
      dispatch(getOneTemplate(id, "copy"));
      handleDialogChange("");
    };

    const handleDialogChange = (model = "") => {
      setIsShowDialog((prev) => ({ open: !prev.open, model: model }));
    };

    
    const processPage = async (index : any, page: any) => {
      return new Promise<void>((resolve, reject) => {
        let pageNumber = page.children.find(
          (el: any) => el.custom?.name === "page-number"
        );
        const text = index === 0 ? "Front" : "Back";

        if (pageNumber) {
          pageNumber.set({ text });
          resolve();
        } else {
          page.addElement({
            type: "text",
            custom: { name: "page-number" },
            text,
            width: store.width,
            align: "center",
            fontSize: 40,
            x: -150,
            y: -50,
            selectable: false,
            alwaysOnTop: true,
          });
          resolve(); 
        }
      });
    };

    const checkPageNumbers = async () => {
      const promises = store.pages.map(async (page: any, index: any) => {
        await processPage(index, page);
      });

      await Promise.all(promises); // Wait for all promises to resolve
    };

    const handleClearStore = () => {
      store.clear();
      let size: string | string[]  = "";
      let isPostCards = false;
      let _product = product;
      if (template?.product) {
        size = template?.product?.paperSize;
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
      size = (size as string)?.split("x");
      store.setSize(+size[1] * DPI, +size[0] * DPI);
      store.addPage();

      if (multiPageLetters.includes(_product.productType)) {
        store.addPage();
        store.selectPage(store.pages[0].id);
      }
      drawRestrictedAreaOnPage(store, product, envelopeType);
      handleDialogChange("");
    };

    useEffect(() => {
      if (templateLoading !== null && templateLoading === false) {
        handleDialogChange("");
        dispatch({ type: TEMPLATE_LOADING, payload: null });
      }
    }, [templateLoading]);

    useEffect(() => {
      if (!search) {
        setSearchApplied(false);
        setSearch("");
        getTemplatesByTab();
      }
    }, [search]);

    useEffect(() => {
      handleLoadAllTemplate(true, true);
      getAllCategories();
      return () => {
        dispatch(clearAllTemplates());
      };
    }, []);

    useEffect(() => {
      getTemplatesByTab();
    }, [currentTemplateType, selectedCategory]);

    useEffect(() => {
      const div = document.querySelector(".polotno-panel-container");
      const handleScroll = () => {
        if (div) {
          const isAtBottom =
            div.scrollTop + div.clientHeight >= div.scrollHeight;
          const isNeedToLoadMore =
            templates.currentPage * templates.perPage < templates.count;
          if (isAtBottom && !templatesPagination.loading && isNeedToLoadMore) {
            handleLoadAllTemplate(true);
          }
        }
      };

      if (div) {
        div.removeEventListener("scroll", handleScroll);
        div.addEventListener("scroll", handleScroll);
      }
      return () => {
        div?.removeEventListener("scroll", handleScroll);
      };
    }, [templates]);

    return (
      <div className="custom-template-section">
        {isShowDialog.open && isShowDialog.model === 'design-own' && (
          <Dialog
            icon={<ModalCross/>}
            title={MESSAGES.TEMPLATE.DESIGN_YOUR_OWN.TITLE}
            subHeading={MESSAGES.TEMPLATE.DESIGN_YOUR_OWN.HEADING}
            description={MESSAGES.TEMPLATE.DESIGN_YOUR_OWN.PARAGRAPH}
            open={isShowDialog.open}
            handleClose={() => handleDialogChange('')}
            onCancel={() => handleDialogChange('')}
            onSubmit={handleClearStore}
            customStyles={designDialogStyles}
            cancelText="Cancel"
            submitText="OK"
          />
          
        )}
        {isShowDialog.open && isShowDialog.model === 'load-template' && (
          <Dialog
            icon={<ModalCross />}
            title={MESSAGES.TEMPLATE.SELECT_TEMPLATE.TITLE}
            subHeading={MESSAGES.TEMPLATE.SELECT_TEMPLATE.HEADING}
            description={MESSAGES.TEMPLATE.SELECT_TEMPLATE.PARAGRAPH}
            open={isShowDialog.open}
            handleClose={() => handleDialogChange('')}
            onCancel={() => handleDialogChange('')}
            onSubmit={() => handleLoadTemplate(selectedRecord?.id)}
            customStyles={designDialogStyles}
            cancelText="Cancel"
            submitText="OK"
          />
        )}
        <div
          className="templateTabsWrapper"
          style={{
            maxWidth: window.innerWidth <= 600 ? '320px' : '480px',
            backgroundColor: '#fff',
          }}
        >          
          <div style={{ marginTop: '8px' }}>
            <GeneralSelect
              placeholder="Template Types"
              options={templateTypes as any}
              setSelectedValue={setCurrentTemplateType  as any}
              selectedValue={currentTemplateType as any}
              // @ts-ignore
              search={() => {}}
              updateErrors={() => {}}
              disableClearable={true}
              templateBuilder={true}
            />
          </div>
          {currentTemplateType?.id === "3" && (
            <div style={{ marginTop: 8 }}>
              <GeneralSelect
                placeholder="Select Category"
                options={templateCategories  as any}
                setSelectedValue={setSelectedCategory  as any}
                selectedValue={selectedCategory as any}
                // @ts-ignore
                search={(() => {}) as any} 
                updateErrors={() => {}}
                disableClearable={false}
                templateBuilder={true}
              />
            </div>
          )}
          <div className="searchWrapper"  style={{ marginTop: '16px', marginBottom: '16px' }}>
            <Input
              type="text"
              value={search}
              name="search"
              // @ts-ignore
              onKeyDown={searchKeyDown}
              onChange={(e: any) => setSearch(e.target.value.trimStart())}
              placeholder="Search by template name"
              inputIcon={true}
              onClick={handleSearch}
            />
            {/* {searchApplied && (
              <HighlightOffIcon
                onClick={() => {
                  setSearch(null);
                  setSearchApplied(false);
                }}
                className="clearSerach"
              />
            )} */}
          </div>
          {currentTemplateType?.id === "1" ? (
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
           ) : currentTemplateType?.id === "2" ? (
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
                  <Typography>No Team Templates to show</Typography>
                </div>
              )}
            </>
          ) : currentTemplateType?.id === '3' ? (
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
                  <Typography>No OLC Templates to show</Typography>
                </div>
              )} 
              </> 
          ) : null} 
        </div>
      </div>
    );
   }) as SideSection['Panel'],
};

export default customTemplateSection;

