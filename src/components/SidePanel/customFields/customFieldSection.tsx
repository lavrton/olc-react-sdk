import React from 'react';
import { observer } from 'mobx-react-lite';
import { SectionTab, } from 'polotno/side-panel';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState} from 'react';
import type { StoreType } from 'polotno/model/store';
import type { TemplatesSection } from 'polotno/side-panel';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchCustomFields } from '../../../redux/actions/customFieldAction';
import Button from '../../GenericUIBlocks/Button';
import { copyToClipboard } from '../../../utils/helper';
import './styles.scss'
import GeneralTootip from '../../GenericUIBlocks/GeneralTooltip';
import InfoIcon from '../../../assets/images/templates/info-icon';
import ContentCopyIcon from '../../..//assets/images/templates/content-copy-icon';
import DynamicField from '../../../assets/images/templates/dynamic-field';
import { success } from '../../../redux/actions/snackbarActions';

type SideSection = typeof TemplatesSection;

const iconButtonStyles= {
  backgroundColor: 'transparent',
}

const customFieldSection: SideSection = {
  name: 'Fields',
  Tab: observer(
    (props: {store: StoreType; active: boolean; onClick: () => void}) => (
      <SectionTab name="Fields" {...props}>
        <DynamicField stroke="var(--sidepanelSVGColor)" />
      </SectionTab>
    )
  ) as SideSection['Tab'],

  Panel: observer(({store}) => {
    const [isShowDialog, setIsShowDialog] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const customFields = useSelector(
      (state: RootState) => state.customFields.customFields
    ) as Record<string, any>;
    const defaultDynamicFields = useSelector(
      (state: RootState) => state.customFields.defaultDynamicFields
    );
    const product = useSelector((state: RootState) => state.templates.product);
    const currentTemplateType = product?.productType;

    const handleShowDialog = () => {
      setIsShowDialog((prev) => !prev);
    };

    useEffect(() => {
      dispatch(fetchCustomFields());
    }, [dispatch]);


    const copyCustomFieldText = (value: string) => {
      if (currentTemplateType === "Real Penned Letter") {
        let modifiedString = value.replace(/{{/g, "((").replace(/}}/g, "))");
        copyToClipboard(modifiedString);
        dispatch(success(`${modifiedString} Copied`));
      } else {
        copyToClipboard(value);
        dispatch(success(`${value} Copied`));
      }
    };

    const handleAddElementOnScreen = (event: any, value: any, type: any) => {
      event.preventDefault();

      if (currentTemplateType === "Real Penned Letter") {
        copyCustomFieldText(value);
        return;
      }

      let x, y;

      if (type === 'drag') {
        const rect = event.currentTarget.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
      } else {
        // For click events, use nativeEvent.offsetX and nativeEvent.offsetY
        x = store.width / 2 - 200;
        y = 300;
      }
      x /= store.activePage.scale;
      y /= store.activePage.scale;

      store.activePage.addElement({
        type: 'text',
        x,
        y,
        text: value,
        width: value.length > 15 ? 10 * value.length : 150,
        contentEditable: false,
      });
    };

    return (
      <div className="dynamic-content">
        <div className="dynamic-content__top">
          <div>
            <span className="title">Contact Fields</span>
            <InfoIcon fill="var(--primaryColor)" className="infoIcon" />
            <GeneralTootip
              anchorSelect=".infoIcon"
              place="bottom"
              title="Merge fields allow you to personalize your mailer with contact information."
            />
          </div>
        </div>
        {defaultDynamicFields.map(
          ({key, value}: {key: string; value: string}, i: number) => (
            <div style={{display: 'flex', alignItems: 'center'}} key={i}>
              <span
                className="contact-element"
                onClick={(event) =>
                  handleAddElementOnScreen(event, key, 'click')
                }
              >
                {value}
              </span>
              <Button
                style={iconButtonStyles}
                onClick={() => copyCustomFieldText(key)}
              >
                <ContentCopyIcon className="copy" />
              </Button>
            </div>
          )
        )}
        <GeneralTootip anchorSelect=".copy" place="bottom" title="Copy" />
        <hr className="divider" />
        <div className="dynamic-content__top">
          <div>
            <span className="title">Custom Fields</span>
            <InfoIcon fill="var(--primaryColor)" className="custom" />
            <GeneralTootip
              anchorSelect=".custom"
              place="bottom"
              title="You can add custom fields to your template."
            />
          </div>
          <Button onClick={handleShowDialog}></Button>
        </div>
        {customFields?.data?.map(
          ({key, value}: {key: string; value: string}, i: number) => (
            <div style={{display: 'flex', alignItems: 'center'}} key={i}>
              <span
                className="contact-element"
                onClick={(event) =>
                  handleAddElementOnScreen(event, key, 'click')
                }
              >
                {value}
              </span>
              <Button
                style={iconButtonStyles}
                onClick={() => copyCustomFieldText(key)}
              >
                <ContentCopyIcon
                  className="copy"
                />
              </Button>
            </div>
          )
        )}
      </div>
    );
  }) as SideSection['Panel'],
};

export default customFieldSection;
