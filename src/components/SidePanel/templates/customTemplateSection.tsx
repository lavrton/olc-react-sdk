import React, { useEffect, useRef, useState } from 'react';

// Polotno and third party libraries
import { observer } from 'mobx-react-lite';
import { SectionTab } from 'polotno/side-panel';
import type { StoreType } from 'polotno/model/store';
import type { TemplatesSection } from 'polotno/side-panel';

// Actions
import {
  clearAllTemplates,
  getAllTemplateCategories,
  getAllTemplatesByTab,
} from '../../../../src/redux/actions/templateActions';
import {
  GET_ONE_TEMPLATE,
  TEMPLATE_LOADING,
} from '../../../redux/actions/action-types';
import { failure } from '../../../redux/actions/snackbarActions';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';

// Utils
import {
  multiPageLetters,
  defaultTemplateTypes,
  DPI,
} from '../../../utils/constants';
import {
  drawRestrictedAreaOnPage,
  getFileAsBlob,
} from '../../../utils/template-builder';
import { MESSAGES } from '../../../utils/message';

// Components
import Typography from '../../GenericUIBlocks/Typography';
import Dialog from '../../GenericUIBlocks/Dialog';
import GeneralSelect from '../../GenericUIBlocks/GeneralSelect';
import Input from '../../GenericUIBlocks/Input';

// Icons
// @ts-ignore
import DesignIcon from '../../../assets/images/templates/template-default-design.tsx';
// @ts-ignore
import dummyTemplateIcon from '../../../assets/images/templates/dummy-template.svg';
// @ts-ignore
import CustomTemplate from '../../../assets/images/templates/custom-template';
import ModalCross from '../../../assets/images/modal-icons/modal-cross';

// styles
import './styles.scss';

type SideSection = typeof TemplatesSection;

const designDialogStyles = {
  maxWidth: '430px',
  minHeight: '265px',
};

const loadDialogStyles = {
  maxWidth: '430px',
  minHeight: '300px',
};

const templateTextStyles: React.CSSProperties = {
  color: `#000`,
  fontSize: `12px`,
  fontStyle: `normal`,
  fontWeight: `500`,
  lineHeight: `normal`,
  marginBottom: `16px`,
};

export type Payload = {
  tab: string;
  page: number;
  pageSize: number;
  productId: string | null;
  search?: string;
  categoryIds?: string[];
};

export type TemplateType = {
  id: string;
  label: string;
};

export type TemplateCategory = {
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

type CustomTemplateSectionProps = {
  store: StoreType;
  active: boolean;
  platformName?: string | null;
  defaultCategory?: string[];
  onClick: () => void;
  onGetOneTemplate?: (payload: any) => Promise<any>;
  onGetTemplates?: (payload: Payload) => Promise<any>;
};

const customTemplateSection: SideSection = {
  name: 'Templates',
  Tab: observer(
    (props: { store: StoreType; active: boolean; onClick: () => void }) => (
      <SectionTab name="Templates" {...props}>
        <CustomTemplate fill="var(--text-color)" />
      </SectionTab>
    )
  ) as SideSection['Tab'],
  Panel: observer(
    ({
      store,
      platformName,
      defaultCategory,
      onGetOneTemplate,
      onGetTemplates,
    }: CustomTemplateSectionProps) => {
      const dispatch: AppDispatch = useDispatch();

      const [templateTypes, setTemplateTypes] = useState<
        [TemplateType] | null
      >();
      const [currentTemplateType, setCurrentTemplateType] =
        useState<TemplateType>();
      const [selectedCategory, setSelectedCategory] =
        useState<TemplateCategory | null>(null);
      const [selectedRecord, setSelectedRecord] =
        useState<TemplateRecord | null>(null);
      const [templateCategories, setTemplateCategories] = useState<
        TemplateCategory[]
      >([]);
      const [myTemplates, setMyTemplates] = useState<TemplateRecord[]>([]);
      const [teamTemplates, setTeamTemplates] = useState<TemplateRecord[]>([]);
      const [olcTemplates, setOlcTemplates] = useState<TemplateRecord[]>([]);
      const [searchApplied, setSearchApplied] = useState(false);
      const [search, setSearch] = useState('');
      const [loader, setLoader] = useState(false);
      const [pagination, setPagination] = useState({
        count: 0,
        currentPage: 0,
        perPage: 0,
      });

      const paginationRef = useRef(pagination);
      const searchRef = useRef(search);
      const currentTemplateTypeRef = useRef(currentTemplateType);

      const templates = useSelector(
        (state: RootState) => state.templates.templates
      ) as Record<string, any>;
      const template = useSelector(
        (state: RootState) => state.templates.template
      ) as Record<string, any>;
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
        model: '',
      });

      const handleLoadTemplateModel = (record: any) => {
        setSelectedRecord(record);
        handleDialogChange('load-template');
      };

      const getTemplatesByTab = async (page = 1) => {
        try {
          page === 1 && setLoader(true);
          const payload: Payload = {
            tab:
              currentTemplateTypeRef.current?.id === '1'
                ? 'my-templates'
                : currentTemplateTypeRef.current?.id === '2'
                  ? 'team-templates'
                  : 'olc-templates',
            page: page,
            pageSize: 10,
            productId: product?.id,
          };
          searchRef.current.length
            ? (payload.search = searchRef.current)
            : undefined;
          currentTemplateTypeRef.current?.id === '3'
            ? (payload.categoryIds = selectedCategory?.id.split(','))
            : undefined;
          const isCustomTemplateType =
            currentTemplateTypeRef.current?.id === '1' ||
            currentTemplateTypeRef.current?.id === '2';
          const templates: any =
            isCustomTemplateType && onGetTemplates
              ? await onGetTemplates(payload)
              : await getAllTemplatesByTab(payload);
          if (templates?.rows) {
            const newTemplates = templates.rows;

            if (currentTemplateTypeRef.current?.id === '1') {
              if (templates.currentPage === 1) {
                setMyTemplates(newTemplates);
              } else {
                setMyTemplates((prevTemplates) => [
                  ...prevTemplates,
                  ...newTemplates,
                ]);
              }
            } else if (currentTemplateTypeRef.current?.id === '2') {
              if (templates.currentPage === 1) {
                setTeamTemplates(newTemplates);
              } else {
                setTeamTemplates((prevTemplates) => [
                  ...prevTemplates,
                  ...newTemplates,
                ]);
              }
            } else if (currentTemplateTypeRef.current?.id === '3') {
              if (templates.currentPage === 1) {
                setOlcTemplates(newTemplates);
              } else {
                setOlcTemplates((prevTemplates) => [
                  ...prevTemplates,
                  ...newTemplates,
                ]);
              }
            }
            setPagination({
              count: templates.count,
              currentPage: templates.currentPage,
              perPage: templates.perPage,
            });
          }
        } catch (error) {
          return error;
        } finally {
          setLoader(false);
        }
      };

      const getAllCategories = async () => {
        const categories: Record<string, any> = await dispatch(
          getAllTemplateCategories
        );
        if (categories?.status === 200) {
          if (defaultCategory && categories?.data?.data) {
            const fetchedCategories = categories.data.data
              .filter((item: any) => item.totalTemplates > 0)
              .map((item: any) => ({
                ...item,
                label: item.title.trim().toLowerCase(),
              }));

            if (fetchedCategories.length > 0) {
              const normalizedDefaultCategories = defaultCategory.map(category => category.trim().toLowerCase());

              if (normalizedDefaultCategories.length === 1) {
                const findCategory = fetchedCategories.find((item: any) => item.label === normalizedDefaultCategories[0]);

                if (findCategory) {
                  setSelectedCategory(findCategory);
                  return;
                }
              } else if (normalizedDefaultCategories.length > 1) {
                const filterCategory = fetchedCategories.filter((item: any) =>
                  normalizedDefaultCategories.includes(item.label)
                );

                if (filterCategory.length > 0) {
                  setSelectedCategory(filterCategory[0]);
                  setTemplateCategories(filterCategory);
                  return;
                }
              }
            }
          }

          setTemplateCategories(
            categories?.data?.data
              .filter((item: any) => item.totalTemplates > 0)
              .map((item: any) => ({
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

      const removeSearchInput = () => {
        setSearchApplied(false);
        setSearch('');
      };

      const searchKeyDown = (event: any) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
      };

      const handleLoadAllTemplate = (
        dynamicPagination = false,
        initialCall = false
      ) => {
        let page = dynamicPagination
          ? ++paginationRef.current.currentPage
          : paginationRef.current.currentPage;

        if (initialCall) {
          page = 1;
        }

        getTemplatesByTab(page);
      };

      const handleLoadTemplate = async (id: any, type = 'copy') => {
        if (onGetOneTemplate) {
          try {
            const template = await onGetOneTemplate(id);
            dispatch({ type: TEMPLATE_LOADING, payload: true });
            if (template) {
              const workspaceElement = document.querySelector(
                '.polotno-workspace-container'
              );
              if (workspaceElement) {
                workspaceElement.classList.add('show-loader');
              }
              // @ts-ignore
              const paperDimensions = template?.product?.paperSize.split('x');
              store.setUnit({
                unit: 'in',
                dpi: 96,
              });
              store.setSize(
                +paperDimensions[1] * DPI,
                +paperDimensions[0] * DPI
              );
              let jsonData = await getFileAsBlob(template?.templateUrl);
              if (template?.product?.productType === 'Real Penned Letter') {
                let clonedJson = JSON.stringify(jsonData)
                  .replace(/{{/g, '((')
                  .replace(/}}/g, '))');
                jsonData = JSON.parse(clonedJson);
              }
              store.loadJSON(jsonData);
              await store.waitLoading();
              dispatch({ type: TEMPLATE_LOADING, payload: false });
              if (workspaceElement) {
                workspaceElement.classList.add('hide-loader');
              }
            }
          } catch (error) {
            return error;
          } finally {
            handleDialogChange('');
          }
        } else {
          dispatch(
            failure(
              'Please provide onGetOneTemplate handler to load this template'
            )
          );
        }
      };

      const handleDialogChange = (model = '') => {
        setIsShowDialog((prev) => ({ open: !prev.open, model: model }));
      };

      const processPage = async (index: any, page: any) => {
        return new Promise<void>((resolve) => {
          let pageNumber = page.children.find(
            (el: any) => el.custom?.name === 'page-number'
          );
          const text = index === 0 ? 'Front' : 'Back';

          if (pageNumber) {
            pageNumber.set({ text });
            resolve();
          } else {
            page.addElement({
              type: 'text',
              custom: { name: 'page-number' },
              text,
              width: store.width,
              align: 'center',
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
        let size: string | string[] = '';
        let isPostCards = false;
        let _product = product;
        if (template?.product) {
          size = template?.product?.paperSize;
          isPostCards = template.product.productType === 'Postcards' || false;
          _product = template.product;
        } else if (product) {
          size = product.selectedSize;
          isPostCards = product.productType === 'Postcards' || false;
        }
        store.setUnit({
          unit: 'in',
          dpi: DPI,
        });
        size = (size as string)?.split('x');
        store.setSize(+size[1] * DPI, +size[0] * DPI);
        store.addPage();

        if (multiPageLetters.includes(_product.productType)) {
          store.addPage();
          store.selectPage(store.pages[0].id);
        }
        drawRestrictedAreaOnPage(store, product, envelopeType);
        handleDialogChange('');
      };

      const handleScroll = () => {
        const div = document.querySelector('.polotno-panel-container');
        if (div) {
          const isAtBottom =
            div.scrollTop + div.clientHeight >= div.scrollHeight;
          const isNeedToLoadMore =
            paginationRef.current.currentPage * paginationRef.current.perPage <
            paginationRef.current.count;
          if (isAtBottom && !templatesPagination.loading && isNeedToLoadMore) {
            handleLoadAllTemplate(true);
          }
        }
      };

      useEffect(() => {
        if (templateLoading !== null && templateLoading === false) {
          handleDialogChange('');
          dispatch({ type: TEMPLATE_LOADING, payload: null });
        }
      }, [templateLoading]);

      useEffect(() => {
        if (!search && searchApplied) {
          setSearchApplied(false);
          setSearch('');
          setTimeout(() => {
            getTemplatesByTab();
          }, 100);
        }
      }, [search]);

      useEffect(() => {
        searchRef.current = search;
      }, [search]);

      useEffect(() => {
        currentTemplateTypeRef.current = currentTemplateType;
      }, [currentTemplateType]);

      useEffect(() => {
        paginationRef.current = pagination;
      }, [pagination]);

      useEffect(() => {
        const newTemplateType = {
          id: '3',
          label: platformName ? `${platformName} Templates` : 'OLC Templates',
        };
        if (onGetTemplates) {
          //@ts-ignore
          setTemplateTypes([...defaultTemplateTypes, newTemplateType]);
        } else {
          setTemplateTypes([newTemplateType]);
        }
        getAllCategories();
        return () => {
          dispatch(clearAllTemplates());
        };
      }, []);

      useEffect(() => {
        if (templateTypes) {
          const type = templateTypes.find((type) => type.id === '3');
          setCurrentTemplateType(type);
        }
      }, [templateTypes]);

      useEffect(() => {
        if (currentTemplateType?.id === '3' && defaultCategory && defaultCategory?.length >= 1) {
          return
        } else if (currentTemplateType) {
          getTemplatesByTab();
        }
      }, [currentTemplateType]);

      useEffect(() => {
        if (selectedCategory) {
          getTemplatesByTab();
        }
      }, [selectedCategory]);

      useEffect(() => {
        const div = document.querySelector('.polotno-panel-container');

        if (div) {
          div.removeEventListener('scroll', handleScroll);
          div.addEventListener('scroll', handleScroll);
        }
        return () => {
          div?.removeEventListener('scroll', handleScroll);
        };
      }, [templates]);

      return (
        <div className="custom-template-section">
          {isShowDialog.open && isShowDialog.model === 'design-own' && (
            <Dialog
              icon={<ModalCross />}
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
              customStyles={loadDialogStyles}
              loading={templateLoading || false}
              cancelText="Cancel"
              submitText="OK"
            />
          )}
          <div className="templateTabsWrapper">
            <div style={{ marginTop: '8px' }}>
              <GeneralSelect
                placeholder="Template Types"
                options={templateTypes as any}
                setSelectedValue={setCurrentTemplateType as any}
                selectedValue={currentTemplateType as any}
                builderSelect={true}
                // @ts-ignore
                search={() => { }}
                updateErrors={() => { }}
                disableClearable={true}
                templateBuilder={true}
              />
            </div>
            {defaultCategory && defaultCategory?.length === 1 ?  <></> : currentTemplateType?.id === '3' && templateCategories?.length >= 1 && (
              <div style={{ marginTop: 8 }}>
                <GeneralSelect
                  placeholder="Select Category"
                  options={templateCategories as any}
                  setSelectedValue={setSelectedCategory as any}
                  selectedValue={selectedCategory as any}
                  builderSelect={true}
                  clearField={true}
                  // @ts-ignore
                  search={(() => { }) as any}
                  updateErrors={() => { }}
                  disableClearable={false}
                  templateBuilder={true}
                />
              </div>
            )}
            <div
              className="searchWrapper">
              <Input
                type="text"
                value={search}
                name="search"
                builderInput={true}
                // @ts-ignore
                onKeyDown={searchKeyDown}
                onChange={(e: any) => setSearch(e.target.value.trimStart())}
                placeholder="Search by template name"
                inputIcon={true}
                onClick={handleSearch}
                searchApplied={searchApplied}
                removeSearchInput={removeSearchInput}
              />
            </div>
            {loader ? (
              <div className="noTemplateText">
                <Typography>{MESSAGES.TEMPLATE.LOADING_TEMPLATE}</Typography>
              </div>
            ) : currentTemplateType?.id === '1' ? (
              <>
                <div
                  className="default-design"
                  onClick={() => handleDialogChange('design-own')}
                >
                  <DesignIcon fill="var(--primary-color)" />
                  <Typography style={templateTextStyles}>
                    {MESSAGES.TEMPLATE.DESIGN_NEW}
                  </Typography>
                </div>
                {myTemplates.length ? (
                  myTemplates.map((template: any, i: number) => (
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
                          currentTarget.classList.add('dummy-image');
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="noTemplateText">
                    <Typography>{MESSAGES.TEMPLATE.NO_MY_TEMPLATES}</Typography>
                  </div>
                )}
              </>
            ) : currentTemplateType?.id === '2' ? (
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
                          currentTarget.classList.add('dummy-image');
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="noTemplateText">
                    <Typography>
                      {MESSAGES.TEMPLATE.NO_TEAM_TEMPLATES}
                    </Typography>
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
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = dummyTemplateIcon;
                          currentTarget.classList.add('dummy-image');
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="noTemplateText">
                    <Typography>
                      {platformName
                        ? `No ${platformName} Templates to show`
                        : MESSAGES.TEMPLATE.NO_OLC_TEMPLATES}
                    </Typography>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      );
    }
  ) as unknown as SideSection['Panel'],
};

export default customTemplateSection;
