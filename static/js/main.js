document.addEventListener('DOMContentLoaded', function () {

  const navbar = document.getElementById('navbar')
  const burger = document.getElementById('navBurger')
  const mobileNav = document.getElementById('navMobile')
  const mobileLinks = document.querySelectorAll('.nav-mobile-link, .nav-mobile-cta')

  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  })

  burger.addEventListener('click', function () {
    mobileNav.classList.toggle('open')
  })

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open')
    })
  })

  const form = document.getElementById('contactForm')
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault()

      const name = document.getElementById('name').value.trim()
      const phone = document.getElementById('phone').value.trim()
      const service = document.getElementById('service').value
      const message = document.getElementById('message').value.trim()

      if (!name || !phone || !service) {
        showMessage('Please fill in all required fields.', 'error')
        return
      }

      const submitBtn = form.querySelector('.form-submit')
      submitBtn.textContent = 'Sending...'
      submitBtn.disabled = true

      setTimeout(function () {
        showMessage('Thanks ' + name + '! We\'ll be in touch via WhatsApp shortly.', 'success')
        form.reset()
        submitBtn.innerHTML = 'Send Enquiry via WhatsApp'
        submitBtn.disabled = false
      }, 1000)
    })
  }

  function showMessage(text, type) {
    const existing = document.querySelector('.form-message')
    if (existing) existing.remove()

    const msg = document.createElement('div')
    msg.className = 'form-message'
    msg.textContent = text
    msg.style.cssText = [
      'padding: 14px 18px',
      'border-radius: 8px',
      'font-size: 14px',
      'font-weight: 500',
      'margin-top: 8px',
      type === 'success'
        ? 'background: rgba(74,222,128,0.12); border: 1px solid rgba(74,222,128,0.3); color: #4ade80;'
        : 'background: rgba(255,107,43,0.12); border: 1px solid rgba(255,107,43,0.3); color: #FF6B2B;'
    ].join(';')

    form.appendChild(msg)

    setTimeout(function () {
      if (msg.parentNode) msg.remove()
    }, 5000)
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  const animateEls = document.querySelectorAll(
    '.service-card, .why-card, .coverage-area, .about-point'
  )

  animateEls.forEach(function (el, i) {
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.transition = 'opacity 0.5s ease ' + (i * 0.08) + 's, transform 0.5s ease ' + (i * 0.08) + 's'
    observer.observe(el)
  })

})
