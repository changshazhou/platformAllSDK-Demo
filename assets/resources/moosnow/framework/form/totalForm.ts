import UIForm from "../../framework/ui/UIForm";
import UIForms from "../../config/UIForms";
import Common from "../utils/Common";
import showTotalOptions from "../../../../moosnowSdk/model/showTotalOptions";


const { ccclass, property } = cc._decorator;

@ccclass
export default class totalForm extends UIForm {

    @property(cc.Sprite)
    checked: cc.Sprite = null;

    @property(cc.Sprite)
    unchecked: cc.Sprite = null;

    @property(cc.Sprite)
    btnReceive: cc.Sprite = null;

    @property(cc.Label)
    levelCoin: cc.Label = null;


    public get FormData(): showTotalOptions {
        return this.mFormData
    }

    public isMask: boolean = true;

    private mCheckedVideo: boolean = true;

    public addEvent() {
        this.unchecked.node.on(cc.Node.EventType.TOUCH_END, this.onShareChange, this)
        this.btnReceive.node.on(cc.Node.EventType.TOUCH_END, this.onReceive, this)
    }
    public removeEvent() {
        this.unchecked.node.off(cc.Node.EventType.TOUCH_END, this.onShareChange, this)
        this.btnReceive.node.off(cc.Node.EventType.TOUCH_END, this.onReceive, this)
    }

    private onReceive() {
        if (this.mCheckedVideo) {
            moosnow.platform.showVideo(res => {
                if (res == moosnow.VIDEO_STATUS.END) {
                    if (this.FormData.hideTotal) {
                        moosnow.ui.hideUIForm(UIForms.TotalForm, null)
                    }
                    if (this.FormData.showEnd) {
                        moosnow.form.showEnd(this.FormData.endOptions)
                    }
                    if (this.FormData && this.FormData.onVideoReceive)
                        this.FormData.onVideoReceive();
                }
                else if (res == moosnow.VIDEO_STATUS.ERR) {
                    moosnow.ui.showToast(moosnow.VIDEO_MSG.ERR)
                }
                else {
                    moosnow.ui.showToast(moosnow.VIDEO_MSG.NOTEND)
                }
            })
        }
        else {
            if (this.FormData && this.FormData.onReceive)
                this.FormData.onReceive();
        }
    }

    private onShareChange() {
        this.mCheckedVideo = !this.mCheckedVideo;
        this.changeUI();

    }

    private changeUI() {
        if (this.mCheckedVideo) {
            this.checked.node.active = true;
        }
        else {
            this.checked.node.active = false;
        }
    }

    public mLevelCoinNum: number = 0;
    public mLevelShareCoinNum: number = 0;
    onShow(data: showTotalOptions) {
        this.mLevelCoinNum = data.coinNum;
        this.mLevelShareCoinNum = data.shareCoinNum
        this.levelCoin.string = `${Common.formatMoney(this.mLevelCoinNum)}`
        this.addEvent();
        this.mCheckedVideo = true;
        this.changeUI();
        moosnow.platform.stopRecord();
        moosnow.platform.showBanner();
    }

    willHide() {
        this.removeEvent();
        moosnow.platform.hideBanner();
    }



    // update (dt) {}
}
