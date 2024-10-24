import styled from "styled-components";

export function NormalInputComponent({
  onChange,
  title,
  height,
  width,
  backgroundColor,
  textColor,
  borderRadius,
  textFontSize,
  placeholder,
}) {
  return (
    <ContenedorInputColumn>
      <TitleInput className="title-label">{title}</TitleInput> {/* Agregamos una clase */}
      <InputC
        type="text"
        onChange={onChange}
        height={height}
        width={width}
        backgroundColor={backgroundColor}
        textColor={textColor}
        borderRadius={borderRadius}
        textFontSize={textFontSize}
        placeholder={placeholder ?? ""}
      ></InputC>
    </ContenedorInputColumn>
  );
}

const InputC = styled.input`
  background-color: ${(props) => props.backgroundColor || "#ffffff"};
  color: ${(props) => props.textColor || "#000000"};
  height: ${(props) => props.height || "45px"};
  width: ${(props) => props.width || "250px"};
  border-radius: ${(props) => props.borderRadius || "8px"};
  font-size: ${(props) => props.textFontSize || "17px"};
  border: black solid 1px;
  padding-left: 5px;

  &::placeholder {
    color: #000000;
  }

  &:focus::placeholder {
    color: transparent;
  }

  @media (max-width: 768px) {
    width: 130px;
    height: 35px;
  }

  @media (max-width: 480px) {
    height: 30px;
    width: 100%;
  }
`;

const ContenedorInputColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.div`
  font-weight: bold;
`;