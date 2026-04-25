import { get } from "http"
import { data } from "./common/data"
import Timeline from "./common/time-line"
import { getTranslations } from "next-intl/server"

export default function Page() {
  return <Timeline items={data} title="title" />
}
