import React from 'react';
import { observer } from 'mobx-react-lite';
import { SectionTab, } from 'polotno/side-panel';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect , useState} from 'react';
// import FaShapes from '@meronex/icons/fa/FaShapes';
import type { StoreType } from 'polotno/model/store';
import type { TemplatesSection } from 'polotno/side-panel';
import { fetchTemplates } from '../../redux/actions/templateActions';
import { AppDispatch, RootState } from '../../redux/store';
import DesignIcon from '../../assets/images/templates/template-default-design.svg'
import dummyTemplateIcon from "../../assets/images/templates/dummy-template.svg";

type SideSection = typeof TemplatesSection;

const section: SideSection = {
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

 
    useEffect(() => {
      dispatch(fetchTemplates());
    }, [dispatch]);
    
    const handleLoadTemplateModel = (record: any) => {
      setSelectedRecord(record);
    }
    
    return (
       <div className='custom-template-section'>
        <div className='title'><span>Templates</span></div>
        <div className='default-design'>
          <img src={DesignIcon} alt="design" />
            <p>Design Your Own</p>
        </div>
        {templates.rows.map((template: any, i:any)=> (
          <div className='design-template' key={i} onClick={()=> handleLoadTemplateModel(template)}>
             <img 
              src={template.thumbnailUrl} 
              alt={template.title} 
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; 
                currentTarget.src = dummyTemplateIcon;
                currentTarget.classList.add('dummy-image')
              }}
            />
          </div>
        ))}
       </div>
     );
   }) as SideSection['Panel'],
};

export default section;
