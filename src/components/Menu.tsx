import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { http } from '../utils/fetch-wrapper.js';
import { accountService } from '../services/accountService.js';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
	{
		title: 'Consulta COVID',
		url: '/page/Inbox',
		iosIcon: mailOutline,
		mdIcon: mailSharp
	},
	{
		title: 'Cerrar Sesión',
		click: function(){accountService.logout();},
		iosIcon: paperPlaneOutline,
		mdIcon: paperPlaneSharp
	}
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
		  /*<IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>*/
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          

		  
          {appPages.map((appPage, index) => {
			  var url=appPage.url;
			  var click=appPage.click;
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === url ? 'selected' : ''} routerLink={url} onClick={click} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>


      </IonContent>
    </IonMenu>
  );
};
        /*<IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>*/
export default Menu;
