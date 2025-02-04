import { Component, Vue } from 'vue-property-decorator'
import AppSelector, { AppSelectorProps as SProps } from '@/components/app/AppSelector'
import { generateDesktopIcons, languageMap } from '@/utils/helper'
import { AppModule } from '@/store/app'
import { PageModule } from '@/store/page'
import { osList } from '@/utils/constant'
import { LoginPosition } from '@/models/page'

@Component
export default class SettingsSelectors extends Vue {
  get isViewThemeOnly() {
    return AppModule.viewThemeOnly
  }

  get languageList() {
    return PageModule.languages.map((language) => ({
      text: languageMap[language],
      value: language
    }))
  }

  get menuPositionItems() {
    const positions = ['top', 'left', 'right', 'bottom', 'center']
    return positions.map(word => ({
      value: word,
      text: this.$t(`settings.login-position.${word}`).toString()
    }))
  }

  get menuPositionValue() {
    return {
      value: PageModule.loginPosition,
      text: this.$t(`settings.login-position.${PageModule.loginPosition}`).toString()
    }
  }

  changeLanguage(value: string) {
    this.$i18n.locale = value
    localStorage.setItem('language', value)
    PageModule.SET_STATE_PAGE({ key: 'language', value })
  }

  changeLoginPosition(position: string) {
    localStorage.setItem('loginPosition', position)
    PageModule.SET_STATE_PAGE({ key: 'loginPosition', value: position as LoginPosition })
  }

  changeDesktop(value: string) {
    AppModule.SAVE_STATE_APP({ key: 'desktop', value })
  }

  changeOs(value: string) {
    AppModule.SAVE_STATE_APP({ key: 'currentOs', value })
  }

  buildSelector(labelI18n: SProps['label'], items: SProps['items'], value: SProps['value'], callback: (value: string) => void) {
    const label = this.$t(`settings.${labelI18n}`)
    return <AppSelector
      label={ label }
      items={ items }
      value={ value }
      onInput={ callback }
    />
  }

  render() {
    return <div class="grid-two">
      <h2 class="title"> { this.$t('settings.title') } </h2>
      { this.buildSelector('choice-language', this.languageList, PageModule.language, this.changeLanguage) }
      { this.buildSelector('login-position.about', this.menuPositionItems, this.menuPositionValue, this.changeLoginPosition) }
      { !this.isViewThemeOnly && this.buildSelector('choice-desktop', generateDesktopIcons(), AppModule.currentDesktop?.key, this.changeDesktop) }
      { !this.isViewThemeOnly && this.buildSelector('choice-os', osList, AppModule.currentOs, this.changeOs) }
    </div>
  }
}
