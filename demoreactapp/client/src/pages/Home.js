import { useState, useCallback, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import PortalPopup from "../components/PortalPopup";
import { useNavigate,useParams } from "react-router-dom";
import styles from "./Home.module.css";
import { socket } from '../lib/netcode.js'

const Home = ({userstate, connected, setUserState}) => {
  const [tempString, setTemp] = useState("--.- °C")
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { userName } = useParams();

 const fetchTemp = async ()=> {
  await fetch('http://localhost:3000/weather/v1/station/current/tawes-v1-10min')
  .then(async data => {
    const res = await data.json();
    const tl = res.features[0].properties.parameters["TL"]
    const tmep = tl.data[0] + " " + tl.unit
    console.log(JSON.stringify(tmep));
    setTemp(tmep)
  })
 }

  useEffect(() => {
    const intervalID = setInterval(async () => {
      fetchTemp()
    }, 180000)

    setTimeout(fetchTemp, 1000)

    return () => {
      clearInterval(intervalID)
    }
  })
  if(userstate[userName] == undefined) {
    userstate[userName] = {
      spotted: false,
      refusedHelp: false,
      needAid: false,
      arrived: false,
      repeat: false,
      reinforcements: false
    }
  }

  if(connected) {
    socket.emit('update_state', {
      text: { test: "connect" },
      userName: userName,
      state: userstate[userName],
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
  }

  const pressButton = (key, value) => {
    console.log("pressing button " + key + " with value " + value)
    setUserState(prevState => ({
      ...prevState,
      [userName]: {
        ...prevState[userName],
        [key]: value,
      },
    }));
  }

  const onMapContainerClick = useCallback(() => {
    navigate("map");
  }, [navigate]);

  const openDropdown = useCallback(() => {
    setDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  return (
    <>
      <div className={styles.home}>
        <div className={styles.navbar}>
          <div className={styles.background} />
          <div className={styles.map} onClick={onMapContainerClick}>
            <div className={styles.map1}>Map</div>
            <img className={styles.map01Icon} alt="" src="/map01.svg" />
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
          <div className={styles.status}>
            <div className={styles.codes1}>Status</div>
            <img
              className={styles.annotationAlertIcon}
              alt=""
              src="/annotationalert.svg"
            />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.buttons}>
            <div className={styles.reinforcements}
              onClick={() => {pressButton('reinforcements', !userstate[userName].reinforcements);}}>
                {!userstate[userName].reinforcements 
                  ? (<img alt="" src="/reinforcements-deactivated-false.png"/>) 
                  : (<img alt="" src="/reinforcements-deactivated-true.png"/>) }
            </div>
            <div className={styles.repeat}
              onClick={() => {pressButton('repeat', !userstate[userName].repeat);}}>
                {!userstate[userName].repeat 
                  ? (<img alt="" src="/repeat-deactivated-false.png"/>) 
                  : (<img alt="" src="/repeat-deactivated-true.png"/>) }
            </div>
            <div className={styles.arrived}
              onClick={() => {pressButton('arrived', !userstate[userName].arrived);}}>
                {!userstate[userName].arrived 
                  ? (<img alt="" src="/arrived-deactivated-false.png"/>) 
                  : (<img alt="" src="/arrived-deactivated-true.png"/>) }
            </div>
            <div className={styles.needAid}
              onClick={() => {pressButton('needAid', !userstate[userName].needAid);}}>
                {!userstate[userName].needAid 
                  ? (<img alt="" src="/aid-deactivated-false.png"/>) 
                  : (<img alt="" src="/aid-deactivated-true.png"/>) }
            </div>
            <div className={styles.refusedHelp}
              onClick={() => {pressButton('refusedHelp', !userstate[userName].refusedHelp);}}>
                {!userstate[userName].refusedHelp 
                  ? (<img alt="" src="/refused-deactivated-false.png"/>) 
                  : (<img alt="" src="/refused-deactivated-true.png"/>) }
            </div>
            <div className={styles.spotted}  
              onClick={() => {pressButton('spotted', !userstate[userName].spotted);}}>
                {!userstate[userName].spotted 
                  ? (<img alt="" src="/Spotted-deactivated-false.png"/>) 
                  : (<img alt="" src="/Spotted-deactivated-true.png"/>) }
            </div>
          </div>
          <div className={styles.call}>
            <div className={styles.background1} />
            <b className={styles.callControlCentre}>Call control center</b>
            <img
              className={styles.phphoneThinIcon}
              alt=""
              src="/phphonethin.svg"
            />
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.background2} />
          <div className={styles.temperatur}>
            {tempString}
          </div>
          <div className={styles.availabilitySelector} onClick={openDropdown}>
            <div className={styles.availabilitySelectorChild} />
            <img
              className={styles.availabilitySelectorItem}
              alt=""
              src="/polygon-1.svg"
            />
            <div className={styles.availabilitySelectorInner} />
            <img className={styles.vectorIcon4} alt="" src="/vector4.svg" />
            <div className={styles.verfgbar}>free</div>
          </div>
          <div className={styles.logo}>
            <img
              className={styles.xxl3945247131Icon}
              alt=""
              src="/69315-xxl394524713-1@2x.png"
            />
            <img className={styles.vectorIcon5} alt="" src="/vector5.svg" />
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
    </>
  );
};

export default Home;
