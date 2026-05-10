import AnimatedSections from "./common/component"
import { FranceComponent } from "./common/france-comp"
import { USAComponent } from "./common/usa-comp"
import { JapanComponent } from "./common/japan-comp"
import { VietnamComponent } from "./common/vietnam-comp"
import "./common/style.css"

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
