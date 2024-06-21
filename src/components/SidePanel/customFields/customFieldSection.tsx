import React from 'react';
import { observer } from 'mobx-react-lite';
import { SectionTab, } from 'polotno/side-panel';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState} from 'react';
// import FaShapes from '@meronex/icons/fa/FaShapes';
import type { StoreType } from 'polotno/model/store';
import type { TemplatesSection } from 'polotno/side-panel';
import { fetchTemplates } from '../../../redux/actions/templateAction';
import { AppDispatch, RootState } from '../../../redux/store';
import DesignIcon from '../../../assets/images/templates/template-default-design.svg'
import dummyTemplateIcon from "../../../assets/images/templates/dummy-template.svg";
import { fetchCustomFields } from '../../../redux/actions/customFieldAction';
import Typography from '../../GenericUIBlocks/Typography';
import Button from '../../GenericUIBlocks/Button';
import { copyToClipboard } from '../../../utils/clipboard';
import './styles.scss'
import GeneralTootip from '../../GenericUIBlocks/GeneralTooltip';
import InfoIcon from '../../../assets/images/templates/info-icon';
import ContentCopyIcon from '../../..//assets/images/templates/content-copy-icon';
import Dialog from '../../GenericUIBlocks/Dialog';
import DynamicField from '../../../assets/images/templates/dynamic-field';

type SideSection = typeof TemplatesSection;

const iconButtonStyles= {
  backgroundColor: 'transparent',
}

const customFieldSection: SideSection = {
  name: 'Fields',
  Tab: observer(
    (props: {store: StoreType; active: boolean; onClick: () => void}) => (
      <SectionTab name="Fields" {...props}>
        {/* <img src={DynamicField} className='dynamic-icon' /> */}
        <DynamicField />
      </SectionTab>
    )
  ) as SideSection['Tab'],

  Panel: observer(({store}) => {
    const [isShowDialog, setIsShowDialog] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // Getting custom fields from Redux state
    const customFields = useSelector(
      (state: RootState) => state.customFields.customFields
    );
    const defaultDynamicFields = useSelector(
      (state: RootState) => state.customFields.defaultDynamicFields
    );

    const handleShowDialog = () => {
      setIsShowDialog((prev) => !prev);
    };

    useEffect(() => {
      dispatch(fetchCustomFields());
    }, [dispatch]);

    const handleAddElementOnScreen = (event: any, value: any, type: any) => {
      event.preventDefault();

      // if (currentTemplateType === "Real Penned Letter") {
      copyToClipboard(value);
      // dispatch(success(`${value} Copied`))
      return;
      // }

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
            <InfoIcon className="infoIcon" />
            <GeneralTootip
              anchorSelect=".infoIcon"
              place="bottom"
              title="Merge fields allow you to personalize your mailer with contact information."
            />
          </div>
        </div>
        {defaultDynamicFields.map(({key, value}, i) => (
          <div style={{display: 'flex', alignItems: 'center'}} key={i}>
            <span
              className="contact-element"
              onClick={(event) => handleAddElementOnScreen(event, key, 'click')}
            >
              {value}
            </span>
            <Button
              style={iconButtonStyles}
              onClick={() => copyToClipboard(key)}
            >
              <ContentCopyIcon className="copy" />
            </Button>
          </div>
        ))}
        <GeneralTootip anchorSelect=".copy" place="bottom" title="Copy" />
        <hr className="divider" />
        <div className="dynamic-content__top">
          <div>
            <span className="title">Custom Fields</span>
            <InfoIcon className="custom" />
            <GeneralTootip
              anchorSelect=".custom"
              place="bottom"
              title="You can add custom fields to your template."
            />
          </div>
          <Button onClick={handleShowDialog}></Button>
        </div>
        {Object.values(customFields)?.map(({key, value}, i) => (
          <div style={{display: 'flex', alignItems: 'center'}} key={i}>
            <span
              className="contact-element"
              onClick={(event) => handleAddElementOnScreen(event, key, 'click')}
            >
              {value}
            </span>
            {/* <Tooltip title="Copy"> */}
            <Button onClick={() => copyToClipboard(key)}>
              {/* <img src={ContentCopyIcon} /> */}
            </Button>
            {/* </Tooltip> */}
          </div>
        ))}
        {/* {isShowDialog && <FormDialog open={isShowDialog} handleClose={handleShowDialog} />}
        {isShowDialog && <CustomFieldNameModel open={isShowDialog} handleClose={handleShowDialog} />} */}
        {/* {true && <Dialog open={isShowDialog} handleClose={handleShowDialog} />} */}
      </div>
    );
  }) as SideSection['Panel'],
};

export default customFieldSection;
