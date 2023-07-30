import { useState, useCallback } from "react";
import Dropdown from "../components/Dropdown";
import PortalPopup from "../components/PortalPopup";
import { useNavigate, useParams} from "react-router-dom";
import styles from "./Map1.module.css";

const Map1 = ({userstate, connected, tempString}) => {
  const [markerPosition, setMarkerPosition] = useState({ x: null, y: null });

  const handleMapClick = (event) => {
    const { pageX, pageY } = event;
    console.log("map clicked: " + pageX + ", " + pageY)
    setMarkerPosition({ x: pageX, y: pageY });
  };


  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const { userName } = useParams();

  const onStatusContainerClick = useCallback(() => {
    navigate('/' + userName);
  }, [navigate, userName]);

  const openDropdown = useCallback(() => {
    setDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  return (
    <div onClick={handleMapClick}>
      {markerPosition.x != null && markerPosition.y != null && (
        <img className={styles.mapPinIcon1} alt="" src="/map-pin1.svg" 
        style={{
          left: markerPosition.x-10,
          top: markerPosition.y-31,
        }}/>
      )}

      <div className={styles.map}>
        <div className={styles.navbar}>
          <div className={styles.background} />
          <div className={styles.map1}>
            <div className={styles.map2}>Map</div>
            <img className={styles.map01Icon} alt="" src="/map011.svg" />
          </div>
          <div className={styles.profile}>
            <img
              className={styles.phuserLightIcon}
              alt=""
              src="/phuserlight1.svg"
            />
            <div className={styles.codes}>
              <p className={styles.profile1}>Profile</p>
            </div>
          </div>
          <div className={styles.status} onClick={onStatusContainerClick}>
            <div className={styles.codes1}>Status</div>
            <img
              className={styles.annotationAlertIcon}
              alt=""
              src="/annotationalert1.svg"
            />
          </div>
        </div>
        <div className={styles.legend}>
          <div className={styles.youAreHere}>Last location</div>
          <img className={styles.mapPinIcon} alt="" src="/map-pin.svg" />
        </div>
        <img
          className={styles.ernstHappelStadionGrad2Icon}
          alt=""
          src="/ernsthappelstadiongrad-2.svg"
        />
        <div className={styles.title}>
          <div className={styles.background1} />
          <div className={styles.ernstHappelStadion}>Ernst Happel Stadion</div>
        </div>
        <div className={styles.header}>
          <div className={styles.background2} />
          <div className={styles.temperatur}>
            {tempString}
          </div>
          <div className={styles.availabilitySelector} onClick={openDropdown}>
            <div className={styles.availabilitySelectorChild} />
            <div className={styles.verfgbar}>free</div>
            <img
              className={styles.availabilitySelectorItem}
              alt=""
              src="/polygon-11.svg"
            />
            <div className={styles.availabilitySelectorInner} />
            <img className={styles.vectorIcon} alt="" src="/vector9.svg" />
          </div>
          <div className={styles.logo}>
            <img
              className={styles.xxl3945247131Icon}
              alt=""
              src="/69315-xxl394524713-1@2x.png"
            />
            <img className={styles.vectorIcon1} alt="" src="/vector10.svg" />
          </div>
        </div>
      </div>
      {isDropdownOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeDropdown}
        >
          <Dropdown onClose={closeDropdown} />
        </PortalPopup>
      )}
    </div>
  );
};

export default Map1;
