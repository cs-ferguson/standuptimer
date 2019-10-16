import React from "react";

import { useStateValue } from "../hooks/useGlobalState";

import MultiInput from "./multiInput";
import CloseIcon from "./icons/close";

import styles from "./settings.module.scss";
import formStyles from "./forms.module.scss";

const Settings = () => {

  const [{settings}, dispatch] = useStateValue();

  return(
    <main className={ styles.settings }>
      <a className={ styles.closeSettings } href="/">Back<CloseIcon /></a>
      <h1>Settings</h1>
      <div className={ formStyles.form }>
        <label>Timer duration</label>
        <div className={ formStyles.rangeInputCont }>
          <input type="range" min="5" max="120" step="5" value={ settings.origDuration/1000 } onChange={ (e) => dispatch({ type: 'UPDATE_DURATION', value: (e.target.value * 1000) }) } />
          <p>{ settings.origDuration/1000 } seconds</p>
        </div>

        <hr />

        <label>Gong message(s)</label>
        <MultiInput key={`gongMessage`} dispatchType={ `UPDATE_GONG_MESSAGE` } initialValues={ settings.gongMessage } placeholderMessage={ `Add your message` } />

        <hr />

        <label>Gong media URL(s)</label>
        <MultiInput key={`gongMediaUrl`} dispatchType={ `UPDATE_GONG_MEDIA_URL` } initialValues={ settings.gongMediaUrl } placeholderMessage={ `Add URL` } />
      </div>

      <hr />

      <a className={ formStyles.textButton } href="/">Close</a>
    </main>
  )
}

export default Settings
