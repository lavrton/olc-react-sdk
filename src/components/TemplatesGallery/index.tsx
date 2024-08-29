import React, {useState} from 'react';

// Components
import Dialog from '../GenericUIBlocks/Dialog';
import Tabs from '../GenericUIBlocks/Tabs';
import GeneralSelect from '../GenericUIBlocks/GeneralSelect';
import Typography from '../GenericUIBlocks/Typography';
import TempCard from '../TemplatesGallery/TempCard';
import Input from '../GenericUIBlocks/Input';

// images
import DesignIcon from '../../assets/images/modal-icons/design-icon'

// styles
import './styles.scss';

const cancelDialogStyles = {
  maxWidth: '1090px',
  minHeight: 'calc(100% - 100px)',
};

const TemplatesGallery = (props:any) => {
  const { open, onClose } = props;
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: any) => {
    setActiveTab(index);
  };

  const tabs = [
    {label: 'My Templates'},
    {label: 'Team Templates'},
    {label: 'Default Templates'},
  ];

  const templateTypes = [
    {
      id: "1",
      label: "HVAC",
    },
    {
      id: "2",
      label: "Real Estate",
    },
    {
      id: "3",
      label: "Ecommerce",
    },
    {
      id: "4",
      label: "Insurance",
    },
    {
      id: "5",
      label: "Car Dealerships",
    },
    {
      id: "6",
      label: "Marketing & Advertising",
    },
  ];
  

  return (
    <>
      <Dialog
        // icon={}
        customStyles={cancelDialogStyles}
        open={open}
        handleClose={onClose}
        title="Postcards (4x6)"
        isGallery={true}
      >
        <div className="topBar">
          <div>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              tabs={tabs}
              className="myCustomTabs"
              tabClassName="myTab"
              indicatorClassName="myIndicator"
            />
          </div>
          <div>
          <Input
            // className={`searchInput`}
            //   className={`searchInput ${searchApplied ? "searchApplied" : ""}`}
            type="text"
            //   value={}
            //   onChange={(e) => setSearch(e.target.value.trimStart())}
            //   onKeyDown={searchKeyDown}
            //   placeholder={MESSAGES.CONTACTS.SEARCH_PLACE_HOLDER}
            placeholder="Search templates by name"
            inputIcon={true}
            gellerySearch={true}
          />
          </div>
        </div>
        <div className="selectBar">
            <div>
              <GeneralSelect
                  placeholder="Select Category"
                  options={templateTypes as any}
                  // setSelectedValue={setSelectedCategory as any}
                  // selectedValue={selectedCategory as any}
                  builderSelect={true}
                  gallerySelect={true}
                  clearField={true}
                  // @ts-ignore
                  search={(() => { }) as any}
                  updateErrors={() => { }}
                  disableClearable={false}
                  templateBuilder={true}
                />
            </div>
            <Typography>50,000 templates</Typography>
          </div>
          <div className="templatesContent">
            {/* <div>
              <div
                className="defaultDesign"
                // onClick={() => handleDialogChange("design-own")}
              >
               <DesignIcon/>
                <Typography>Design Your Own</Typography>
              </div>
              <Typography>Design Your Own</Typography>
            </div> */}
            <TempCard />
          </div>
      </Dialog>
    </>
  );
};

export default TemplatesGallery;
