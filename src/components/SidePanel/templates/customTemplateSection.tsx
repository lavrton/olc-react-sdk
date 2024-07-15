import React, { useEffect, useState } from 'react';

// Polotno and third party libraries
import { observer } from 'mobx-react-lite';
import { SectionTab } from 'polotno/side-panel';
import type { StoreType } from 'polotno/model/store';
import type { TemplatesSection } from 'polotno/side-panel';

// Actions
import {
  clearAllTemplates,
  getOneTemplate,
  getAllTemplateCategories,
} from '../../../../src/redux/actions/templateActions';
import { TEMPLATE_LOADING } from '../../../redux/actions/action-types';
import { failure } from '../../../redux/actions/snackbarActions';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';

// Utils
import { multiPageLetters, templateTypes, DPI } from '../../../utils/constants';
import { drawRestrictedAreaOnPage } from '../../../utils/template-builder';
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
  maxWidth: '600px',
  minHeight: '270px',
};

const templateTextStyles: React.CSSProperties = {
  color: `var(--textColor)`,
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
  onClick: () => void;
  onGetTemplates?: (payload: Payload) => Promise<any>;
};

const customTemplateSection: SideSection = {
  name: 'Templates',
  Tab: observer(
    (props: { store: StoreType; active: boolean; onClick: () => void }) => (
      <SectionTab name="Templates" {...props}>
        <CustomTemplate fill="var(--sidepanelSVGColor)" />
      </SectionTab>
    )
  ) as SideSection['Tab'],
  Panel: observer(({ store, onGetTemplates }: CustomTemplateSectionProps) => {
    const dispatch: AppDispatch = useDispatch();

    const [currentTemplateType, setCurrentTemplateType] = useState<TemplateType>(templateTypes[0]);
    const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | null>(null);
    const [selectedRecord, setSelectedRecord] = useState<TemplateRecord | null>(
      null
    );
    const [templateCategories, setTemplateCategories] = useState<
      TemplateCategory[]
    >([]);
    const [myTemplates, setMyTemplates] = useState<TemplateRecord[]>([]);
    const [teamTemplates, setTeamTemplates] = useState<TemplateRecord[]>([]);
    const [olcTemplates, setOlcTemplates] = useState<TemplateRecord[]>([]);
    const [searchApplied, setSearchApplied] = useState(false);
    const [search, setSearch] = useState('');

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

    const getTemplatesByTab = async () => {
      const payload: Payload = {
        tab: currentTemplateType?.id === '1'
          ? 'my-templates'
          : currentTemplateType?.id === '2'
            ? 'team-templates'
            : 'olc-templates',
        page: 1,
        pageSize: 500,
        productId: product?.id,
      };
      search.length ? (payload.search = search) : undefined;
      currentTemplateType?.id === '3'
        ? (payload.categoryIds = selectedCategory?.id.split(','))
        : undefined;
      if (onGetTemplates) {
        const templates: any = await onGetTemplates(payload);
        if (templates.length) {
          if (currentTemplateType?.id === '1') {
            setMyTemplates(templates);
          } else if (currentTemplateType?.id === '2') {
            setTeamTemplates(templates);
          } else {
            setOlcTemplates(templates);
          }
        }
      } else {
        dispatch(failure("Please provide onGetTemplates handler via Props to load templates"))
      }
    };

    // TODO Call New Route / Recive via Props for Templates Category
    const getAllCategories = async () => {
      const categories: Record<string, any> = dispatch(
        getAllTemplateCategories
      );
      if (categories?.status === 200) {
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

    const handleLoadAllTemplate = (pagination = false, initialCall = false) => {
      let page = pagination ? ++templates.currentPage : templates.currentPage;
      if (initialCall) {
        page = 1;
      }
      // Call getAllTemplates if required.
    };

    const handleLoadTemplate = (id: any) => {
      dispatch(getOneTemplate(id, 'copy'));
      handleDialogChange('');
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

    useEffect(() => {
      if (templateLoading !== null && templateLoading === false) {
        handleDialogChange('');
        dispatch({ type: TEMPLATE_LOADING, payload: null });
      }
    }, [templateLoading]);

    useEffect(() => {
      if (!search) {
        setSearchApplied(false);
        setSearch('');
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
      const div = document.querySelector('.polotno-panel-container');
      const handleScroll = () => {
        if (div) {
          const isAtBottom = div.scrollTop + div.clientHeight >= div.scrollHeight;
          const isNeedToLoadMore = templates.currentPage * templates.perPage < templates.count;
          if (isAtBottom && !templatesPagination.loading && isNeedToLoadMore) {
            handleLoadAllTemplate(true);
          }
        }
      };

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
            icon={<ModalCross fill="var(--primaryColor)" />}
            title={MESSAGES.TEMPLATE.DESIGN_YOUR_OWN.TITLE}
            subHeading={MESSAGES.TEMPLATE.DESIGN_YOUR_OWN.HEADING}
            description={MESSAGES.TEMPLATE.DESIGN_YOUR_OWN.PARAGRAPH}
            open={isShowDialog.open}
            handleClose={() => handleDialogChange('')}
            onCancel={() => handleDialogChange('')}
            onSubmit={handleClearStore}
            customStyles={designDialogStyles}
            cancelText="Cancel"
            submitText="OK" />
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
            submitText="OK" />
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
              setSelectedValue={setCurrentTemplateType as any}
              selectedValue={currentTemplateType as any}
              // @ts-ignore
              search={() => { }}
              updateErrors={() => { }}
              disableClearable={true}
              templateBuilder={true} />
          </div>
          {currentTemplateType?.id === '3' && (
            <div style={{ marginTop: 8 }}>
              <GeneralSelect
                placeholder="Select Category"
                options={templateCategories as any}
                setSelectedValue={setSelectedCategory as any}
                selectedValue={selectedCategory as any}
                // @ts-ignore
                search={(() => { }) as any}
                updateErrors={() => { }}
                disableClearable={false}
                templateBuilder={true} />
            </div>
          )}
          <div
            className="searchWrapper"
            style={{ marginTop: '16px', marginBottom: '16px' }}
          >
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
              searchApplied={searchApplied}
              removeSearchInput={removeSearchInput} />
          </div>
          {currentTemplateType?.id === '1' ? (
            <>
              <div
                className="default-design"
                onClick={() => handleDialogChange('design-own')}
              >
                <DesignIcon fill="var(--svgColorSecondary)" />
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
                      }} />
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
                      }} />
                  </div>
                ))
              ) : (
                <div className="noTemplateText">
                  <Typography>{MESSAGES.TEMPLATE.NO_TEAM_TEMPLATES}</Typography>
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
                      }} />
                  </div>
                ))
              ) : (
                <div className="noTemplateText">
                  <Typography>{MESSAGES.TEMPLATE.NO_OLC_TEMPLATES}</Typography>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    );
  }) as unknown as SideSection['Panel'],
};

export default customTemplateSection;
