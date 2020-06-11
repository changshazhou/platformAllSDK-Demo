
import endForm from "./endForm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class endFormOPPO extends endForm {
    public isMask: boolean = true;

    willShow(data) {
        super.willShow(data);
        moosnow.platform.checkVersion("", (open) => {
            if (open) {
                moosnow.platform.hideBanner();
                moosnow.entity.showEntity("nativeAd", this.node, { x: 0, y: 0 })
            }
            else {
                moosnow.entity.hideAllEntity("nativeAd")
                moosnow.platform.showBanner();
            }
        })
    }
}