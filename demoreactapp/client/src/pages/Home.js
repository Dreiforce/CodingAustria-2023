import { useState, useCallback } from "react";
import Dropdown from "../components/Dropdown";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
const Home = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const onMapContainerClick = useCallback(() => {
    navigate("/map");
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
            <div className={styles.reinforcements}>
              <img
                className={styles.reinforcementsChild}
                alt=""
                src="/rectangle-15.svg"
              />
              <img
                className={styles.reinforcementsItem}
                alt=""
                src="/rectangle-16.svg"
              />
              <div className={styles.reinforcementsInner} />
              <div className={styles.ellipseDiv} />
              <div className={styles.rectangleDiv} />
              <div className={styles.reinforcements1}>Reinforcements</div>
              <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            </div>
            <div className={styles.repeat}>
              <img
                className={styles.reinforcementsChild}
                alt=""
                src="/rectangle-151.svg"
              />
              <img
                className={styles.repeatItem}
                alt=""
                src="/rectangle-161.svg"
              />
              <div className={styles.repeatInner} />
              <div className={styles.repeatChild1} />
              <div className={styles.repeat1}>Repeat</div>
              <img
                className={styles.materialSymbolsreplayIcon}
                alt=""
                src="/materialsymbolsreplay.svg"
              />
            </div>
            <div className={styles.arrived}>
              <img
                className={styles.reinforcementsChild}
                alt=""
                src="/rectangle-152.svg"
              />
              <img
                className={styles.reinforcementsItem}
                alt=""
                src="/rectangle-162.svg"
              />
              <div className={styles.reinforcementsInner} />
              <div className={styles.ellipseDiv} />
              <div className={styles.rectangleDiv} />
              <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
              <div className={styles.arrived1}>Arrived</div>
            </div>
            <div className={styles.needAid}>
              <img
                className={styles.reinforcementsChild}
                alt=""
                src="/rectangle-153.svg"
              />
              <img
                className={styles.repeatItem}
                alt=""
                src="/rectangle-163.svg"
              />
              <div className={styles.repeatInner} />
              <div className={styles.repeatChild1} />
              <div className={styles.needAid1}>Need aid</div>
              <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
            </div>
            <div className={styles.refusedHelp}>
              <img
                className={styles.reinforcementsChild}
                alt=""
                src="/rectangle-154.svg"
              />
              <img
                className={styles.reinforcementsItem}
                alt=""
                src="/rectangle-164.svg"
              />
              <div className={styles.reinforcementsInner} />
              <div className={styles.ellipseDiv} />
              <div className={styles.rectangleDiv} />
              <div className={styles.refusedHelp1}>Refused help</div>
              <div className={styles.x}>X</div>
            </div>
            <div className={styles.spotted}>
              <img
                className={styles.reinforcementsChild}
                alt=""
                src="/rectangle-155.svg"
              />
              <img
                className={styles.repeatItem}
                alt=""
                src="/rectangle-165.svg"
              />
              <div className={styles.repeatInner} />
              <div className={styles.repeatChild1} />
              <div className={styles.spotted1}>Spotted</div>
              <img className={styles.vectorIcon3} alt="" src="/vector3.svg" />
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
          <div className={styles.availabilitySelector} onClick={openDropdown}>
            <div className={styles.availabilitySelectorChild} />
            <img
              className={styles.availabilitySelectorItem}
              alt=""
              src="/polygon-1.svg"
            />
            <div className={styles.availabilitySelectorInner} />
            <img className={styles.vectorIcon4} alt="" src="/vector4.svg" />
            <div className={styles.verfgbar}>Verfügbar</div>
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
