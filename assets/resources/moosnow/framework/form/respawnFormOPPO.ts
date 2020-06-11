import respawnForm from "./respawnForm";


const { ccclass, property } = cc._decorator;

@ccclass
export default class respawnFormOPPO extends respawnForm {

    public isMask: boolean = true;

    onShow() {
        this.node.zIndex = 7
        moosnow.form.showAd(moosnow.AD_POSITION.CENTER, () => { })
        moosnow.http.getAllConfig(res => {
            let openAd = res && res.zs_jump_switch == 1;
            if (!openAd) {
                this.addMask();
            }
        })
        moosnow.platform.checkVersion("", (open) => {
            if (open) {
                moosnow.entity.showEntity("nativeAd", this.node, null)
            }
            else {
                moosnow.entity.hideAllEntity("nativeAd")
                moosnow.platform.showBanner();
            }
        })

        moosnow.platform.pauseRecord();
    }
}
