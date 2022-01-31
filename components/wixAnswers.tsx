import Script from "next/script";

export function WixAnswers(): JSX.Element {
  const script =
    '!function(){function e(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://skwirl.wixanswers.com/apps/widget/v1/skwirl/1323e5fb-24ab-48aa-ba01-ae08cf993d94/en/embed.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}window.addEventListener?window.addEventListener("load",e):window.attachEvent("onload",e),window.AnswersWidget={onLoaded:function(e){window.AnswersWidget.queue.push(e)},queue:[]}}();';
  return <Script id="wix-script">{script}</Script>;
}
