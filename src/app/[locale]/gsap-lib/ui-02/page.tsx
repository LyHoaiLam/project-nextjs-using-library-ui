import AnimatedSections from "./common/AnimatedSections"
import { FranceComponent } from "./common/FranceComponent"
import { JapanComponent } from "./common/JapanComponent"
import { USAComponent } from "./common/USAComponent"
import { VietnamComponent } from "./common/VietNamComponent"

export default function Page() {
  return (
    <AnimatedSections headerLeft="Hoai Lam" headerRight="Hoai Lam2">
      <FranceComponent />
      <USAComponent />
      <JapanComponent />
      <VietnamComponent />
    </AnimatedSections>
  )
}
