import Image from "next/image";
import LinkReact from "@/components/transition/LinkReact";

const Education = ({ education }) => {
  return (
    <>
      {education.map((item) => (
        <>
          <LinkReact item={item} index={crypto.randomUUID()}>
            <Image
              key={crypto.randomUUID()}
              src={require(`../../../${item.icon}`).default}
              height={26}
              width={26}
              alt={item.icon_alt}
              style={{ marginRight: "10px" }}
            />
          </LinkReact>
          <div style={{ margin: "0.5rem 0 2rem" }}>
            {item.description.map((desc) => (
              <>
                <p
                  key={crypto.randomUUID()}
                  style={{ margin: "0", "font-style": "italic" }}
                >
                  {desc}
                </p>
              </>
            ))}
          </div>
        </>
      ))}
    </>
  );
};

export default Education;
