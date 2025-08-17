import Image from "next/image";
import LinkReact from "@/components/transition/LinkReact";
import {
  afpiIcon,
  beaIcon,
  cesiIcon,
  dymaIcon,
  mindeoIcon,
  wseIcon,
} from "@/components/img/aside/education/logoEducation/logoEducation";

const iconEducation = {
  dyma: dymaIcon,
  mindeo: mindeoIcon,
  bea: beaIcon,
  wse: wseIcon,
  cesi: cesiIcon,
  afpi: afpiIcon,
};

const Education = ({ education }) => {
  return (
    <>
      {education.map((item, index) => {
        let svgName = item.icon;
        const SvgComponent = iconEducation[svgName];
        return (
          <div key={crypto.randomUUID()}>
            <LinkReact item={item} index={index}>
              <span style={{ width: "26px", marginRight: "10px" }}>
                <SvgComponent alt={item.icon_alt} />
              </span>
            </LinkReact>
            <span style={{ margin: "0.5rem 0 2rem" }}>
              {item.description.map((desc, i) => (
                <p
                  key={i}
                  style={{
                    margin: "0",
                    fontStyle: "italic",
                    paddingBottom: "1rem",
                  }}
                >
                  {desc}
                </p>
              ))}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default Education;
