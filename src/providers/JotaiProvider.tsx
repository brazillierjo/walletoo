"use client";

import { Provider } from "jotai";

interface Props extends React.PropsWithChildren {}

export default function JotaiProvider({ children }: Props): JSX.Element {
  return <Provider>{children}</Provider>;
}
