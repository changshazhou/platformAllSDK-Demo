import UIForm from "../../framework/ui/UIForm";
import UIForms from "../../config/UIForms";
import Common from "../utils/Common";


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
                    this.receiveSuccess(this.mLevelCoinNum * 5)
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
            this.receiveSuccess(this.mLevelCoinNum)
        }
    }


    private receiveSuccess(coin: number) {
        moosnow.ui.hideUIForm(UIForms.TotalForm, null)
        moosnow.ui.pushUIForm(UIForms.EndForm, { coin, ...Common.deepCopy(this.FormData) })
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
    onShow(data) {
        let { coin, shareCoin } = data
        this.mLevelCoinNum = coin;
        this.mLevelShareCoinNum = shareCoin
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
