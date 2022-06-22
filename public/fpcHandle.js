var swiperLogo = undefined
var swiperLogo1 = undefined
var configFpcCountTime = 60 // 倒计时时间
var fpcIsCounting = false // 是否正在倒计时
var fpcCountTime = configFpcCountTime // 用来重置倒计时
// 提交后是否显示成功
var isShowSuccess = true
// 倒计时
function countDown() {
  $('.code-btn')
    .text(fpcCountTime + 'S')
    .addClass('counting')
  fpcCountTime = fpcCountTime - 1
  if (fpcCountTime >= 0) {
    fpcIsCounting = true
    setTimeout(function () {
      if (fpcIsCounting) {
        countDown()
      }
    }, 1000)
  } else {
    fpcIsCounting = false
    fpcCountTime = configFpcCountTime
    $('.code-btn').text('获取验证码').removeClass('counting')
  }
}
// 监听页面滚动来显示浮动框
function watchScroll() {
  $(document).on('scroll', function () {
    if ($(document).scrollTop() > 300) {
      $('.fpc-show-flag').fadeIn()
    } else {
      $('.fpc-show-flag').fadeOut()
    }
  })
}
function watchCloseStick() {
  $('.s-close').on('click', function () {
    $('.stick-wrap').animate({ right: '100%' })
    $('.stick-mini').animate({ left: '0px' })
  })
}
function watchStickMini() {
  $('.stick-mini').on('click', function () {
    $('.stick-mini').animate({ left: '-84px' })
    $('.stick-wrap').animate({ right: '0' })
  })
}
// 监听搜索切换按键
function watchTabs() {
  $('.tabs>li').on('hover', function () {
    $('.tabs>li').removeClass('active')
    var fpcTabValue = $(this).data('value')
    $('.search-form>.search-content').removeClass('search-active')
    $('.search-form>.search-content').eq(fpcTabValue).addClass('search-active')
    $(this).addClass('active')
    if (fpcTabValue === 0) {
      swiperLogo.destroy()
      newSwiperSearch()
    } else {
      swiperLogo1.destroy()
      newSwiperSearch1()
    }
  })
}
// 查询结果示例轮播0
function newSwiperSearch() {
  swiperLogo = new Swiper('.swiper-search', {
    direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    slidesPerView: 3,
    autoplay: true //可选选项，自动滑动
  })
}
// 查询结果示例轮播1
function newSwiperSearch1() {
  swiperLogo1 = new Swiper('.sts-form', {
    direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    slidesPerView: 3,
    autoplay: true //可选选项，自动滑动
  })
}
// 监听弹框按钮的点击
function watchDialogBtnClick() {
  $('.dialog-btn').on('click', function () {
    // 获取 title
    var dialogTitle = $(this).data('title')
    // 获取 手机号提示框
    var dialogPhoneHolder = $(this).data('phone-holder')
    // 获取 需显示列表
    var dialogShowList = $(this).data('show')
    // 获取 提交按钮文字
    var dialogSubmit = $(this).data('submit')
    // 获取 是否提取电话
    var dialogTransPhone = $(this).data('transphone') || false
    if (dialogTransPhone) {
      $('.dialog-phone-value').val($('.page-phone-value').val() || '')
    }
    // $('.dialog-trademark-value').val($('.index-trademark-value').val() || '')
    // isShowSuccess = $(this).data('show-success') === false ? false : true
    $('.fpc-mask').show()
    $('.form-dialog').show()
    $('.dialog-title').text(dialogTitle)
    $('.dialog-phone-value').attr('placeholder', dialogPhoneHolder)
    $('.dialog-submit').text(dialogSubmit)
    // 遍历展示需要显示的输入框
    for (var i = 0; i < dialogShowList.length; i++) {
      if (dialogShowList[i]) {
        $('.dialog-item').eq(i).show()
      } else {
        $('.dialog-item').eq(i).hide()
      }
    }
  })
}
// 监听弹框关闭
function watchCloseDialog() {
  $('.dialog-close').on('click', function () {
    fpcResetForm()
    $('.fpc-mask').hide()
    $('.base-dialog').hide()
  })
}
// 监听发送验证码
function watchSendCode() {
  $('.code-btn').on('click', function () {
    // 验证手机号
    if (!fpcIsPhone('.dialog-phone-value')) {
      $('.dialog-phone-warn').show()
      return false
    } else {
      $('.dialog-phone-warn').hide()
    }
    // 如果没有倒计时
    if (!fpcIsCounting) {
      countDown()
    }
  })
}
// 验证手机号
function fpcIsPhone(inputClass) {
  var fpcPhone = $(inputClass).val()
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(fpcPhone)) {
    return false
  } else {
    return true
  }
}
// 重置表单
function fpcResetForm() {
  $('.page-logo-value').val('')
  $('.page-phone-value').val('')
  $('.page-name-value').val('')
  $('.stick-select-value').val('')
  $('.stick-logo-value').val('')
  $('.dialog-phone-value').val('')
  $('.dialog-code-value').val('')
  $('.dialog-phone-warn').hide()
  $('.dialog-code-warn').hide()
  // 重置倒计时
  fpcCountTime = configFpcCountTime
  fpcIsCounting = false
  $('.code-btn').text('获取验证码').removeClass('counting')
}
// 关闭所有dialog
function closeAllDialog() {
  fpcResetForm()
  $('.fpc-mask').hide()
  $('.base-dialog').hide()
  $('.success-dialog').hide()
}
// 展示提交成功弹框
function showSuccess() {
  $('.fpc-mask').show()
  $('.form-dialog').hide()
  $('.success-dialog').show()
}
// 监听页面提交按钮
function watchDialogSubmit() {
  $('.dialog-submit').on('click', function () {
    // 验证手机号
    if (!fpcIsPhone('.dialog-phone-value')) {
      $('.dialog-phone-warn').show()
      return false
    }
    // 手机号通过验证
    $('.dialog-phone-warn').hide()
    // 验证是否填写短信验证码
    if (!$('.dialog-code-value').val()) {
      $('.dialog-code-warn').show()
      return false
    }
    // 短信验证码通过验证
    $('.dialog-code-warn').hide()
    // 通过验证
    // $('.dialog-pop').hide()
    // 在下面进行提交操作 fpc todo
    // 展示提交成功
    if (isShowSuccess) {
      showSuccess()
    } else {
      // 不显示提交成功
      closeAllDialog()
    }
  })
}
function pageInit() {
  watchTabs()
  newSwiperSearch()
  newSwiperSearch1()
  watchScroll()
  watchCloseStick()
  watchStickMini()
  watchCloseDialog()
  watchSendCode()
  watchDialogBtnClick()
  watchDialogSubmit()
}
$(function () {
  pageInit()
})
