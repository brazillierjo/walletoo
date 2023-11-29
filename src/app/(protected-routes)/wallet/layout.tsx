import { Metadata } from "next/types"

export const metadata: Metadata = {
  title: "Walletoo - Mon Wallet",
  description: "Gérez vos finances personnelles en toute simplicité avec Walletoo",
}

type Props = {
  children: React.ReactNode
}

const WalletLayout: React.FC<Props> = async ({ children }: Props) => {
  return children as JSX.Element
}

export default WalletLayout
