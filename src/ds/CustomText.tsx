import styled from "styled-components/native";
import {typography, TypographyProps, variant} from "styled-system";

export const CustomText = styled.Text<TypographyProps>`
  ${typography}
  ${variant({
    variants: {
      xlarge: {
        fontSize: 28,
      },
      large: {
        fontSize: 24,
      },
      regular: {
        fontSize: 16,
      },
      small: {
        fontSize: 14,
      },
      batata: {
        fontSize: 19,
        color: "red",
      },
    },
  })}
`;
