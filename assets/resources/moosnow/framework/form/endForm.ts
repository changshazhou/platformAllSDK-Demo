import UIForm from "../../framework/ui/UIForm";
import UIForms from "../../config/UIForms";

const { ccclass, property } = cc._decorator;

@ccclass
export default class endForm extends UIForm {

    @property(cc.Node)
    public btnWinReceive: cc.Node = null;


    @property(cc.Label)
    public coinText: cc.Label = null;

    @property(cc.Node)
    public winBox: cc.Node = null;


    /**
     * 是否有渐入渐出效果
     */
    public isPopEffect: boolean = true;
    /**
     * 是否需要蒙层
     */
    public isMask: boolean = false;

    public coin: number = 0;
    constructor() { super(); }

    onEnable() {
        this.addListener();
    }
    onDisable() {
        this.removeListener();
    }
    addListener() {
        this.btnWinReceive.on(cc.Node.EventType.TOUCH_END, this.receiveCoin, this);
    }
    removeListener() {
        this.btnWinReceive.off(cc.Node.EventType.TOUCH_END, this.receiveCoin, this);
    }
    willShow(data) {
        super.willShow(data);
        // Lite.data.setTryingSkin(null);
    }
    onShow(data) {
        let isWin = data.isWin;
        let level = data.level;
        let fail = data.fail;

        if (data) {
            let coin = data.coin;
            moosnow.data.addCoin(parseInt(coin));
            moosnow.data.saveCoin();
        }

        if (isWin) {
            this.winBox.active = true;
        }
        else {
            this.winBox.active = false;
        }
        this.showStar(level, data.useTime);


        this.node.zIndex = 7;
        moosnow.form.showAd(moosnow.AD_POSITION.CENTER | moosnow.AD_POSITION.MASK | moosnow.AD_POSITION.WAIT | moosnow.AD_POSITION.BACK, () => {
            moosnow.form.showAd(moosnow.AD_POSITION.NONE, () => { })
            //回到首页

        }, 6)

    }
    willHide() {
        moosnow.platform.hideBanner();
    }
    public showStar(level, useTime) {



    }

    receiveCoin() {
        moosnow.data.addCoin(this.coin);
        moosnow.data.saveCoin();
        this.goIndexCb();
    }
    goIndexCb() {
        moosnow.ui.hideUIForm(UIForms.EndForm, null);
        moosnow.ui.pushUIForm(UIForms.HomeForm)
    }
}