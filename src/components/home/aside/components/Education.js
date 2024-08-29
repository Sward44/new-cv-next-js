import Image from "next/image";
import LinkReact from "@/components/transition/LinkReact";

const Education = ({ education }) => {
  return (
    <>
      {education.map((item, index) => (
        <>
          <LinkReact item={item} index={index}>
            <Image
              key={crypto.randomUUID()}
              src={require(`../../../${item.icon}`).default}
              height={26}
              width={26}
              alt={item.icon_alt}
              style={{ marginRight: "10px" }}
            />
          </LinkReact>
          <span style={{ margin: "0.5rem 0 2rem" }}>
            {item.description.map((desc, i) => (
              <>
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
              </>
            ))}
          </span>
        </>
      ))}
    </>
  );
};

export default Education;
