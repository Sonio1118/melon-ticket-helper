/**
 * 회차 선택 화면에서 실행될 스크립트입니다.
 */

async function doScheduleMagic() {
  /** 원본 함수를 조금 바꿉니다. */
  window.reservationZAM = function(prodId, scheduleNo, nfActionId, sessionKey, shuffleKey) {
    console.log('줄서기 시작한다구~!');

    var oneStopWindowSize = getOneStopSize();
    NetFunnel_Action({action_id:nfActionId}, {
      success:function(ev,ret) {
        window.open("", "onstopForm", oneStopWindowSize);
        var frm = document.oneForm;
        var url = 'https://ticket.melon.com/reservation/popup/onestop.htm';
        frm.action = url;
        frm.target = 'onstopForm';
        frm.prodId.value = prodId;
        frm.pocCode.value = 'SC0002';
        frm.scheduleNo.value = scheduleNo;
        frm.sellTypeCode.value = 'ST0001';
        frm.tYn.value = 'Y';
        frm.chk.value = encodeURIComponent(sessionKey);
        frm.shuffleKey.value = encodeURIComponent(shuffleKey);

        console.log(`key를 빼돌렸다제wwwww [${ret.data.key}]`);
        const theSecretCode = `(function openNow() {
          var oneStopWindowSize = getOneStopSize();
          window.open("", "onstopForm", oneStopWindowSize);
          var frm = document.oneForm;
          var url = 'https://ticket.melon.com/reservation/popup/onestop.htm';
          frm.action = url;
          frm.target = 'onstopForm';
          frm.prodId.value = '207126';
          frm.pocCode.value = 'SC0002';
          frm.scheduleNo.value = '100002';
          frm.sellTypeCode.value = 'ST0001';
          frm.tYn.value = 'Y';
          frm.chk.value = encodeURIComponent('ED83ACt1ED9484e6mEBB8941p0EBA19DB2l8ockK9DB2l8ey');
          frm.shuffleKey.value = encodeURIComponent('44446415606466425564');
          frm.netfunnel_key.value = ":key=" + '${ret.data.key}' + "&";
          frm.submit();
        }){}`;
        console.log(`이렇게 쓰시라구요:\n${theSecretCode}`);
        alert(`이렇게 쓰시라구요:\n${theSecretCode}`);

        frm.netfunnel_key.value = ":key=" + ret.data.key + "&";
        frm.submit();
      },
      block: function(ev,ret) {
        alert(nf_block_msg);
        return false;
      },
      error: function(ev,ret) {
        alert("다시 시도 부탁 드립니다.");
        return false;
      }
    });
  }

  /** 18일 예약 버튼을 누릅니다. */
  reservation(
    '207126', /*prodId*/
    '100002', /*scheduleNo*/
    'mypayment', /*nfActionId*/
    'ED83ACt1ED9484e6mEBB8941p0EBA19DB2l8ockK9DB2l8ey', /*sessionKey*/
    '44446415606466425564' /*shuffleKey*/
  );
}

window.addEventListener('load', function () {
  console.log('행동 개시!');

  window.addEventListener('keypress', async function (e) {
    if (e.key === '/') {
      doScheduleMagic();
    }
  }, false);

  console.log('준비 완료 >_<');
});
