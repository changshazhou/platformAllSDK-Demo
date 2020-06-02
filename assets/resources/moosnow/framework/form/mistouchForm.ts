import UIForm from "../../framework/ui/UIForm";
import Common from "../../utils/Common";
import UIForms from "../../config/UIForms";
import EventType from "../../utils/EventType";
import { AdType } from "../../enum/AdType";
import { BannerClickType } from "../../enum/BannerClickType";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MistouchForm extends UIForm {

    @property(cc.ProgressBar)
    clickProgress: cc.ProgressBar = null;

    @property(cc.Node)
    btnBanner: cc.Node = null;

    @property(cc.Node)
    logo: cc.Node = null;


    private mMaxNum: number = 10;
    private mCurrentNum: number = 0;
    private mNavigateIndex: number = 0;
    private mBannerShow: boolean = false;
    private mShowTime: number = 0;

    private mBeginPos: cc.Vec2;
    private mEndPos: cc.Vec2;

    private mBannerClickType: BannerClickType = BannerClickType.AUTO_HIDE;

    private LogicData;
    willShow(data) {

        this.btnBanner.active = true;

        this.LogicData = data;

        this.mBeginPos = this.logo.position.clone();
        this.mEndPos = this.mBeginPos.add(new cc.Vec2(0, 50));

        this.mCurrentNum = 0;
        this.mNavigateIndex = Common.randomNumBoth(3, this.mMaxNum - 2);
        this.addEvent();
        this.schedule(this.subProgress, 0.1)
        Lite.event.sendEventImmediately(EventType.ADFORM_CHANGE, {});


        this.mBannerShow = false;

        moosnow.http.getAllConfig(res => {
            // this.mBannerClickType = res.bannerClickType
            this.mBannerClickType = BannerClickType.MAST;
        })

    }
    willHide() {
        this.unschedule(this.subProgress)
        this.unschedule(this.resetProgress)
        this.removeEvent();

    }

    private subProgress() {
        if (this.mCurrentNum > 0)
            this.mCurrentNum -= 0.1
    }
    private addEvent() {
        this.btnBanner.on(cc.Node.EventType.TOUCH_START, this.onLogoUp, this)
        this.btnBanner.on(cc.Node.EventType.TOUCH_END, this.onBannerClick, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.stopPropagation, this)
    }


    private bannerClickCallback(isOpend) {
        if (isOpend) {
            this.unschedule(this.onHideBanner)
            this.unschedule(this.resetProgress)
            moosnow.platform.hideBanner();
            this.mBannerShow = false;
            if ((this.LogicData.level) <= Lite.data.getCurrentLevel()) {

                Lite.ui.pushUIForm(UIForms.CoinForm, {
                    level: this.LogicData.level,
                    callback: () => {
                        Lite.ui.destroyUIForm(UIForms.MistouchForm, null)
                    }
                })
                console.log('onOpendLevel', this.LogicData.level)


            }
            else
                Lite.ui.destroyUIForm(UIForms.MistouchForm, null)

        }
    }


    private removeEvent() {
        this.btnBanner.off(cc.Node.EventType.TOUCH_END, this.onBannerClick, this)
        this.node.off(cc.Node.EventType.TOUCH_END, this.stopPropagation, this)
        Lite.event.removeListener(EventType.ON_PLATFORM_SHOW, this);
    }

    private stopPropagation(e: cc.Event.EventTouch) {
        e.stopPropagation();
    }
    private onLogoUp() {
        this.logo.position = this.mEndPos;
    }
    private onLogoDown() {
        this.logo.position = this.mBeginPos;
    }

    private onBannerClick() {
        this.onLogoDown();

        this.mCurrentNum += 1;

        if (this.mCurrentNum >= this.mNavigateIndex) {
            if (!this.mBannerShow) {
                this.mShowTime = Date.now();
                this.mBannerShow = true;
                moosnow.platform.showBanner((e) => {
                    console.log('banner click callback ', e)
                    this.bannerClickCallback(e);
                });
                if (this.mBannerClickType == BannerClickType.AUTO_HIDE) {
                    this.unschedule(this.onHideBanner)
                    this.scheduleOnce(this.onHideBanner, 2)
                }
                else if (this.mBannerClickType == BannerClickType.MAST) {
                    this.unschedule(this.resetProgress)
                    this.scheduleOnce(this.resetProgress, 2)
                }

            }
        }
        if (this.mCurrentNum >= this.mMaxNum) {
            moosnow.platform.hideBanner();
            this.mBannerShow = false;
            Lite.ui.destroyUIForm(UIForms.MistouchForm, null)
            if ((this.LogicData.level) <= Lite.data.getCurrentLevel()) {
                Lite.ui.pushUIForm(UIForms.CoinForm, {
                    level: this.LogicData.level,
                    callback: () => {
                        Lite.ui.destroyUIForm(UIForms.MistouchForm, null)
                    }
                })
                console.log('onOpendLevel', this.LogicData.level)
            }
        }
    }

    private resetProgress() {
        this.mCurrentNum = 0;
        moosnow.platform.hideBanner();
        this.mBannerShow = false;
    }

    private onHideBanner() {
        moosnow.platform.hideBanner();
    }

    update() {
        this.clickProgress.progress = this.mCurrentNum / this.mMaxNum
    }

}
