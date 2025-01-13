var H = "top", U = "bottom", q = "right", j = "left", dn = "auto", lt = [H, U, q, j], Be = "start", Je = "end", Mi = "clippingParents", es = "viewport", Ue = "popper", Bi = "reference", Kn = /* @__PURE__ */ lt.reduce(function(t, e) {
  return t.concat([e + "-" + Be, e + "-" + Je]);
}, []), ts = /* @__PURE__ */ [].concat(lt, [dn]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Be, e + "-" + Je]);
}, []), Ri = "beforeRead", Vi = "read", Hi = "afterRead", ji = "beforeMain", Wi = "main", Fi = "afterMain", zi = "beforeWrite", Ki = "write", Yi = "afterWrite", Ui = [Ri, Vi, Hi, ji, Wi, Fi, zi, Ki, Yi];
function ue(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function G(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Re(t) {
  var e = G(t).Element;
  return t instanceof e || t instanceof Element;
}
function J(t) {
  var e = G(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function ns(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = G(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Pr(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(n) {
    var s = e.styles[n] || {}, i = e.attributes[n] || {}, o = e.elements[n];
    !J(o) || !ue(o) || (Object.assign(o.style, s), Object.keys(i).forEach(function(r) {
      var a = i[r];
      a === !1 ? o.removeAttribute(r) : o.setAttribute(r, a === !0 ? "" : a);
    }));
  });
}
function Mr(t) {
  var e = t.state, n = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow), function() {
    Object.keys(e.elements).forEach(function(s) {
      var i = e.elements[s], o = e.attributes[s] || {}, r = Object.keys(e.styles.hasOwnProperty(s) ? e.styles[s] : n[s]), a = r.reduce(function(c, f) {
        return c[f] = "", c;
      }, {});
      !J(i) || !ue(i) || (Object.assign(i.style, a), Object.keys(o).forEach(function(c) {
        i.removeAttribute(c);
      }));
    });
  };
}
const ss = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Pr,
  effect: Mr,
  requires: ["computeStyles"]
};
function le(t) {
  return t.split("-")[0];
}
var Pe = Math.max, Xt = Math.min, et = Math.round;
function Yn() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function qi() {
  return !/^((?!chrome|android).)*safari/i.test(Yn());
}
function tt(t, e, n) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  var s = t.getBoundingClientRect(), i = 1, o = 1;
  e && J(t) && (i = t.offsetWidth > 0 && et(s.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && et(s.height) / t.offsetHeight || 1);
  var r = Re(t) ? G(t) : window, a = r.visualViewport, c = !qi() && n, f = (s.left + (c && a ? a.offsetLeft : 0)) / i, d = (s.top + (c && a ? a.offsetTop : 0)) / o, g = s.width / i, w = s.height / o;
  return {
    width: g,
    height: w,
    top: d,
    right: f + g,
    bottom: d + w,
    left: f,
    x: f,
    y: d
  };
}
function is(t) {
  var e = tt(t), n = t.offsetWidth, s = t.offsetHeight;
  return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - s) <= 1 && (s = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: n,
    height: s
  };
}
function Gi(t, e) {
  var n = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && ns(n)) {
    var s = e;
    do {
      if (s && t.isSameNode(s))
        return !0;
      s = s.parentNode || s.host;
    } while (s);
  }
  return !1;
}
function me(t) {
  return G(t).getComputedStyle(t);
}
function Br(t) {
  return ["table", "td", "th"].indexOf(ue(t)) >= 0;
}
function Te(t) {
  return ((Re(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function fn(t) {
  return ue(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (ns(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Te(t)
  );
}
function Ws(t) {
  return !J(t) || // https://github.com/popperjs/popper-core/issues/837
  me(t).position === "fixed" ? null : t.offsetParent;
}
function Rr(t) {
  var e = /firefox/i.test(Yn()), n = /Trident/i.test(Yn());
  if (n && J(t)) {
    var s = me(t);
    if (s.position === "fixed")
      return null;
  }
  var i = fn(t);
  for (ns(i) && (i = i.host); J(i) && ["html", "body"].indexOf(ue(i)) < 0; ) {
    var o = me(i);
    if (o.transform !== "none" || o.perspective !== "none" || o.contain === "paint" || ["transform", "perspective"].indexOf(o.willChange) !== -1 || e && o.willChange === "filter" || e && o.filter && o.filter !== "none")
      return i;
    i = i.parentNode;
  }
  return null;
}
function At(t) {
  for (var e = G(t), n = Ws(t); n && Br(n) && me(n).position === "static"; )
    n = Ws(n);
  return n && (ue(n) === "html" || ue(n) === "body" && me(n).position === "static") ? e : n || Rr(t) || e;
}
function os(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function vt(t, e, n) {
  return Pe(t, Xt(e, n));
}
function Vr(t, e, n) {
  var s = vt(t, e, n);
  return s > n ? n : s;
}
function Xi() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Qi(t) {
  return Object.assign({}, Xi(), t);
}
function Zi(t, e) {
  return e.reduce(function(n, s) {
    return n[s] = t, n;
  }, {});
}
var Hr = function(e, n) {
  return e = typeof e == "function" ? e(Object.assign({}, n.rects, {
    placement: n.placement
  })) : e, Qi(typeof e != "number" ? e : Zi(e, lt));
};
function jr(t) {
  var e, n = t.state, s = t.name, i = t.options, o = n.elements.arrow, r = n.modifiersData.popperOffsets, a = le(n.placement), c = os(a), f = [j, q].indexOf(a) >= 0, d = f ? "height" : "width";
  if (!(!o || !r)) {
    var g = Hr(i.padding, n), w = is(o), m = c === "y" ? H : j, C = c === "y" ? U : q, b = n.rects.reference[d] + n.rects.reference[c] - r[c] - n.rects.popper[d], E = r[c] - n.rects.reference[c], S = At(o), x = S ? c === "y" ? S.clientHeight || 0 : S.clientWidth || 0 : 0, L = b / 2 - E / 2, _ = g[m], A = x - w[d] - g[C], T = x / 2 - w[d] / 2 + L, $ = vt(_, T, A), M = c;
    n.modifiersData[s] = (e = {}, e[M] = $, e.centerOffset = $ - T, e);
  }
}
function Wr(t) {
  var e = t.state, n = t.options, s = n.element, i = s === void 0 ? "[data-popper-arrow]" : s;
  i != null && (typeof i == "string" && (i = e.elements.popper.querySelector(i), !i) || Gi(e.elements.popper, i) && (e.elements.arrow = i));
}
const Ji = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: jr,
  effect: Wr,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function nt(t) {
  return t.split("-")[1];
}
var Fr = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function zr(t, e) {
  var n = t.x, s = t.y, i = e.devicePixelRatio || 1;
  return {
    x: et(n * i) / i || 0,
    y: et(s * i) / i || 0
  };
}
function Fs(t) {
  var e, n = t.popper, s = t.popperRect, i = t.placement, o = t.variation, r = t.offsets, a = t.position, c = t.gpuAcceleration, f = t.adaptive, d = t.roundOffsets, g = t.isFixed, w = r.x, m = w === void 0 ? 0 : w, C = r.y, b = C === void 0 ? 0 : C, E = typeof d == "function" ? d({
    x: m,
    y: b
  }) : {
    x: m,
    y: b
  };
  m = E.x, b = E.y;
  var S = r.hasOwnProperty("x"), x = r.hasOwnProperty("y"), L = j, _ = H, A = window;
  if (f) {
    var T = At(n), $ = "clientHeight", M = "clientWidth";
    if (T === G(n) && (T = Te(n), me(T).position !== "static" && a === "absolute" && ($ = "scrollHeight", M = "scrollWidth")), T = T, i === H || (i === j || i === q) && o === Je) {
      _ = U;
      var I = g && T === A && A.visualViewport ? A.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        T[$]
      );
      b -= I - s.height, b *= c ? 1 : -1;
    }
    if (i === j || (i === H || i === U) && o === Je) {
      L = q;
      var D = g && T === A && A.visualViewport ? A.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        T[M]
      );
      m -= D - s.width, m *= c ? 1 : -1;
    }
  }
  var B = Object.assign({
    position: a
  }, f && Fr), ie = d === !0 ? zr({
    x: m,
    y: b
  }, G(n)) : {
    x: m,
    y: b
  };
  if (m = ie.x, b = ie.y, c) {
    var V;
    return Object.assign({}, B, (V = {}, V[_] = x ? "0" : "", V[L] = S ? "0" : "", V.transform = (A.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + b + "px)" : "translate3d(" + m + "px, " + b + "px, 0)", V));
  }
  return Object.assign({}, B, (e = {}, e[_] = x ? b + "px" : "", e[L] = S ? m + "px" : "", e.transform = "", e));
}
function Kr(t) {
  var e = t.state, n = t.options, s = n.gpuAcceleration, i = s === void 0 ? !0 : s, o = n.adaptive, r = o === void 0 ? !0 : o, a = n.roundOffsets, c = a === void 0 ? !0 : a, f = {
    placement: le(e.placement),
    variation: nt(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: i,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Fs(Object.assign({}, f, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: r,
    roundOffsets: c
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Fs(Object.assign({}, f, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const rs = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Kr,
  data: {}
};
var Vt = {
  passive: !0
};
function Yr(t) {
  var e = t.state, n = t.instance, s = t.options, i = s.scroll, o = i === void 0 ? !0 : i, r = s.resize, a = r === void 0 ? !0 : r, c = G(e.elements.popper), f = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return o && f.forEach(function(d) {
    d.addEventListener("scroll", n.update, Vt);
  }), a && c.addEventListener("resize", n.update, Vt), function() {
    o && f.forEach(function(d) {
      d.removeEventListener("scroll", n.update, Vt);
    }), a && c.removeEventListener("resize", n.update, Vt);
  };
}
const as = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Yr,
  data: {}
};
var Ur = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ut(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Ur[e];
  });
}
var qr = {
  start: "end",
  end: "start"
};
function zs(t) {
  return t.replace(/start|end/g, function(e) {
    return qr[e];
  });
}
function ls(t) {
  var e = G(t), n = e.pageXOffset, s = e.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: s
  };
}
function cs(t) {
  return tt(Te(t)).left + ls(t).scrollLeft;
}
function Gr(t, e) {
  var n = G(t), s = Te(t), i = n.visualViewport, o = s.clientWidth, r = s.clientHeight, a = 0, c = 0;
  if (i) {
    o = i.width, r = i.height;
    var f = qi();
    (f || !f && e === "fixed") && (a = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: o,
    height: r,
    x: a + cs(t),
    y: c
  };
}
function Xr(t) {
  var e, n = Te(t), s = ls(t), i = (e = t.ownerDocument) == null ? void 0 : e.body, o = Pe(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0), r = Pe(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0), a = -s.scrollLeft + cs(t), c = -s.scrollTop;
  return me(i || n).direction === "rtl" && (a += Pe(n.clientWidth, i ? i.clientWidth : 0) - o), {
    width: o,
    height: r,
    x: a,
    y: c
  };
}
function us(t) {
  var e = me(t), n = e.overflow, s = e.overflowX, i = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + i + s);
}
function eo(t) {
  return ["html", "body", "#document"].indexOf(ue(t)) >= 0 ? t.ownerDocument.body : J(t) && us(t) ? t : eo(fn(t));
}
function Et(t, e) {
  var n;
  e === void 0 && (e = []);
  var s = eo(t), i = s === ((n = t.ownerDocument) == null ? void 0 : n.body), o = G(s), r = i ? [o].concat(o.visualViewport || [], us(s) ? s : []) : s, a = e.concat(r);
  return i ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(Et(fn(r)))
  );
}
function Un(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Qr(t, e) {
  var n = tt(t, !1, e === "fixed");
  return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Ks(t, e, n) {
  return e === es ? Un(Gr(t, n)) : Re(e) ? Qr(e, n) : Un(Xr(Te(t)));
}
function Zr(t) {
  var e = Et(fn(t)), n = ["absolute", "fixed"].indexOf(me(t).position) >= 0, s = n && J(t) ? At(t) : t;
  return Re(s) ? e.filter(function(i) {
    return Re(i) && Gi(i, s) && ue(i) !== "body";
  }) : [];
}
function Jr(t, e, n, s) {
  var i = e === "clippingParents" ? Zr(t) : [].concat(e), o = [].concat(i, [n]), r = o[0], a = o.reduce(function(c, f) {
    var d = Ks(t, f, s);
    return c.top = Pe(d.top, c.top), c.right = Xt(d.right, c.right), c.bottom = Xt(d.bottom, c.bottom), c.left = Pe(d.left, c.left), c;
  }, Ks(t, r, s));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function to(t) {
  var e = t.reference, n = t.element, s = t.placement, i = s ? le(s) : null, o = s ? nt(s) : null, r = e.x + e.width / 2 - n.width / 2, a = e.y + e.height / 2 - n.height / 2, c;
  switch (i) {
    case H:
      c = {
        x: r,
        y: e.y - n.height
      };
      break;
    case U:
      c = {
        x: r,
        y: e.y + e.height
      };
      break;
    case q:
      c = {
        x: e.x + e.width,
        y: a
      };
      break;
    case j:
      c = {
        x: e.x - n.width,
        y: a
      };
      break;
    default:
      c = {
        x: e.x,
        y: e.y
      };
  }
  var f = i ? os(i) : null;
  if (f != null) {
    var d = f === "y" ? "height" : "width";
    switch (o) {
      case Be:
        c[f] = c[f] - (e[d] / 2 - n[d] / 2);
        break;
      case Je:
        c[f] = c[f] + (e[d] / 2 - n[d] / 2);
        break;
    }
  }
  return c;
}
function st(t, e) {
  e === void 0 && (e = {});
  var n = e, s = n.placement, i = s === void 0 ? t.placement : s, o = n.strategy, r = o === void 0 ? t.strategy : o, a = n.boundary, c = a === void 0 ? Mi : a, f = n.rootBoundary, d = f === void 0 ? es : f, g = n.elementContext, w = g === void 0 ? Ue : g, m = n.altBoundary, C = m === void 0 ? !1 : m, b = n.padding, E = b === void 0 ? 0 : b, S = Qi(typeof E != "number" ? E : Zi(E, lt)), x = w === Ue ? Bi : Ue, L = t.rects.popper, _ = t.elements[C ? x : w], A = Jr(Re(_) ? _ : _.contextElement || Te(t.elements.popper), c, d, r), T = tt(t.elements.reference), $ = to({
    reference: T,
    element: L,
    strategy: "absolute",
    placement: i
  }), M = Un(Object.assign({}, L, $)), I = w === Ue ? M : T, D = {
    top: A.top - I.top + S.top,
    bottom: I.bottom - A.bottom + S.bottom,
    left: A.left - I.left + S.left,
    right: I.right - A.right + S.right
  }, B = t.modifiersData.offset;
  if (w === Ue && B) {
    var ie = B[i];
    Object.keys(D).forEach(function(V) {
      var Se = [q, U].indexOf(V) >= 0 ? 1 : -1, $e = [H, U].indexOf(V) >= 0 ? "y" : "x";
      D[V] += ie[$e] * Se;
    });
  }
  return D;
}
function ea(t, e) {
  e === void 0 && (e = {});
  var n = e, s = n.placement, i = n.boundary, o = n.rootBoundary, r = n.padding, a = n.flipVariations, c = n.allowedAutoPlacements, f = c === void 0 ? ts : c, d = nt(s), g = d ? a ? Kn : Kn.filter(function(C) {
    return nt(C) === d;
  }) : lt, w = g.filter(function(C) {
    return f.indexOf(C) >= 0;
  });
  w.length === 0 && (w = g);
  var m = w.reduce(function(C, b) {
    return C[b] = st(t, {
      placement: b,
      boundary: i,
      rootBoundary: o,
      padding: r
    })[le(b)], C;
  }, {});
  return Object.keys(m).sort(function(C, b) {
    return m[C] - m[b];
  });
}
function ta(t) {
  if (le(t) === dn)
    return [];
  var e = Ut(t);
  return [zs(t), e, zs(e)];
}
function na(t) {
  var e = t.state, n = t.options, s = t.name;
  if (!e.modifiersData[s]._skip) {
    for (var i = n.mainAxis, o = i === void 0 ? !0 : i, r = n.altAxis, a = r === void 0 ? !0 : r, c = n.fallbackPlacements, f = n.padding, d = n.boundary, g = n.rootBoundary, w = n.altBoundary, m = n.flipVariations, C = m === void 0 ? !0 : m, b = n.allowedAutoPlacements, E = e.options.placement, S = le(E), x = S === E, L = c || (x || !C ? [Ut(E)] : ta(E)), _ = [E].concat(L).reduce(function(ze, we) {
      return ze.concat(le(we) === dn ? ea(e, {
        placement: we,
        boundary: d,
        rootBoundary: g,
        padding: f,
        flipVariations: C,
        allowedAutoPlacements: b
      }) : we);
    }, []), A = e.rects.reference, T = e.rects.popper, $ = /* @__PURE__ */ new Map(), M = !0, I = _[0], D = 0; D < _.length; D++) {
      var B = _[D], ie = le(B), V = nt(B) === Be, Se = [H, U].indexOf(ie) >= 0, $e = Se ? "width" : "height", Y = st(e, {
        placement: B,
        boundary: d,
        rootBoundary: g,
        altBoundary: w,
        padding: f
      }), oe = Se ? V ? q : j : V ? U : H;
      A[$e] > T[$e] && (oe = Ut(oe));
      var It = Ut(oe), xe = [];
      if (o && xe.push(Y[ie] <= 0), a && xe.push(Y[oe] <= 0, Y[It] <= 0), xe.every(function(ze) {
        return ze;
      })) {
        I = B, M = !1;
        break;
      }
      $.set(B, xe);
    }
    if (M)
      for (var Pt = C ? 3 : 1, Tn = function(we) {
        var wt = _.find(function(Bt) {
          var Le = $.get(Bt);
          if (Le)
            return Le.slice(0, we).every(function(Cn) {
              return Cn;
            });
        });
        if (wt)
          return I = wt, "break";
      }, gt = Pt; gt > 0; gt--) {
        var Mt = Tn(gt);
        if (Mt === "break") break;
      }
    e.placement !== I && (e.modifiersData[s]._skip = !0, e.placement = I, e.reset = !0);
  }
}
const no = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: na,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ys(t, e, n) {
  return n === void 0 && (n = {
    x: 0,
    y: 0
  }), {
    top: t.top - e.height - n.y,
    right: t.right - e.width + n.x,
    bottom: t.bottom - e.height + n.y,
    left: t.left - e.width - n.x
  };
}
function Us(t) {
  return [H, q, U, j].some(function(e) {
    return t[e] >= 0;
  });
}
function sa(t) {
  var e = t.state, n = t.name, s = e.rects.reference, i = e.rects.popper, o = e.modifiersData.preventOverflow, r = st(e, {
    elementContext: "reference"
  }), a = st(e, {
    altBoundary: !0
  }), c = Ys(r, s), f = Ys(a, i, o), d = Us(c), g = Us(f);
  e.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: f,
    isReferenceHidden: d,
    hasPopperEscaped: g
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": g
  });
}
const so = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: sa
};
function ia(t, e, n) {
  var s = le(t), i = [j, H].indexOf(s) >= 0 ? -1 : 1, o = typeof n == "function" ? n(Object.assign({}, e, {
    placement: t
  })) : n, r = o[0], a = o[1];
  return r = r || 0, a = (a || 0) * i, [j, q].indexOf(s) >= 0 ? {
    x: a,
    y: r
  } : {
    x: r,
    y: a
  };
}
function oa(t) {
  var e = t.state, n = t.options, s = t.name, i = n.offset, o = i === void 0 ? [0, 0] : i, r = ts.reduce(function(d, g) {
    return d[g] = ia(g, e.rects, o), d;
  }, {}), a = r[e.placement], c = a.x, f = a.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += c, e.modifiersData.popperOffsets.y += f), e.modifiersData[s] = r;
}
const io = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: oa
};
function ra(t) {
  var e = t.state, n = t.name;
  e.modifiersData[n] = to({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const ds = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: ra,
  data: {}
};
function aa(t) {
  return t === "x" ? "y" : "x";
}
function la(t) {
  var e = t.state, n = t.options, s = t.name, i = n.mainAxis, o = i === void 0 ? !0 : i, r = n.altAxis, a = r === void 0 ? !1 : r, c = n.boundary, f = n.rootBoundary, d = n.altBoundary, g = n.padding, w = n.tether, m = w === void 0 ? !0 : w, C = n.tetherOffset, b = C === void 0 ? 0 : C, E = st(e, {
    boundary: c,
    rootBoundary: f,
    padding: g,
    altBoundary: d
  }), S = le(e.placement), x = nt(e.placement), L = !x, _ = os(S), A = aa(_), T = e.modifiersData.popperOffsets, $ = e.rects.reference, M = e.rects.popper, I = typeof b == "function" ? b(Object.assign({}, e.rects, {
    placement: e.placement
  })) : b, D = typeof I == "number" ? {
    mainAxis: I,
    altAxis: I
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, I), B = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, ie = {
    x: 0,
    y: 0
  };
  if (T) {
    if (o) {
      var V, Se = _ === "y" ? H : j, $e = _ === "y" ? U : q, Y = _ === "y" ? "height" : "width", oe = T[_], It = oe + E[Se], xe = oe - E[$e], Pt = m ? -M[Y] / 2 : 0, Tn = x === Be ? $[Y] : M[Y], gt = x === Be ? -M[Y] : -$[Y], Mt = e.elements.arrow, ze = m && Mt ? is(Mt) : {
        width: 0,
        height: 0
      }, we = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Xi(), wt = we[Se], Bt = we[$e], Le = vt(0, $[Y], ze[Y]), Cn = L ? $[Y] / 2 - Pt - Le - wt - D.mainAxis : Tn - Le - wt - D.mainAxis, xr = L ? -$[Y] / 2 + Pt + Le + Bt + D.mainAxis : gt + Le + Bt + D.mainAxis, On = e.elements.arrow && At(e.elements.arrow), Lr = On ? _ === "y" ? On.clientTop || 0 : On.clientLeft || 0 : 0, Ds = (V = B == null ? void 0 : B[_]) != null ? V : 0, kr = oe + Cn - Ds - Lr, Nr = oe + xr - Ds, Is = vt(m ? Xt(It, kr) : It, oe, m ? Pe(xe, Nr) : xe);
      T[_] = Is, ie[_] = Is - oe;
    }
    if (a) {
      var Ps, Dr = _ === "x" ? H : j, Ir = _ === "x" ? U : q, ke = T[A], Rt = A === "y" ? "height" : "width", Ms = ke + E[Dr], Bs = ke - E[Ir], Sn = [H, j].indexOf(S) !== -1, Rs = (Ps = B == null ? void 0 : B[A]) != null ? Ps : 0, Vs = Sn ? Ms : ke - $[Rt] - M[Rt] - Rs + D.altAxis, Hs = Sn ? ke + $[Rt] + M[Rt] - Rs - D.altAxis : Bs, js = m && Sn ? Vr(Vs, ke, Hs) : vt(m ? Vs : Ms, ke, m ? Hs : Bs);
      T[A] = js, ie[A] = js - ke;
    }
    e.modifiersData[s] = ie;
  }
}
const oo = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: la,
  requiresIfExists: ["offset"]
};
function ca(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function ua(t) {
  return t === G(t) || !J(t) ? ls(t) : ca(t);
}
function da(t) {
  var e = t.getBoundingClientRect(), n = et(e.width) / t.offsetWidth || 1, s = et(e.height) / t.offsetHeight || 1;
  return n !== 1 || s !== 1;
}
function fa(t, e, n) {
  n === void 0 && (n = !1);
  var s = J(e), i = J(e) && da(e), o = Te(e), r = tt(t, i, n), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (s || !s && !n) && ((ue(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  us(o)) && (a = ua(e)), J(e) ? (c = tt(e, !0), c.x += e.clientLeft, c.y += e.clientTop) : o && (c.x = cs(o))), {
    x: r.left + a.scrollLeft - c.x,
    y: r.top + a.scrollTop - c.y,
    width: r.width,
    height: r.height
  };
}
function ha(t) {
  var e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), s = [];
  t.forEach(function(o) {
    e.set(o.name, o);
  });
  function i(o) {
    n.add(o.name);
    var r = [].concat(o.requires || [], o.requiresIfExists || []);
    r.forEach(function(a) {
      if (!n.has(a)) {
        var c = e.get(a);
        c && i(c);
      }
    }), s.push(o);
  }
  return t.forEach(function(o) {
    n.has(o.name) || i(o);
  }), s;
}
function pa(t) {
  var e = ha(t);
  return Ui.reduce(function(n, s) {
    return n.concat(e.filter(function(i) {
      return i.phase === s;
    }));
  }, []);
}
function ma(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(n) {
      Promise.resolve().then(function() {
        e = void 0, n(t());
      });
    })), e;
  };
}
function ga(t) {
  var e = t.reduce(function(n, s) {
    var i = n[s.name];
    return n[s.name] = i ? Object.assign({}, i, s, {
      options: Object.assign({}, i.options, s.options),
      data: Object.assign({}, i.data, s.data)
    }) : s, n;
  }, {});
  return Object.keys(e).map(function(n) {
    return e[n];
  });
}
var qs = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Gs() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  return !e.some(function(s) {
    return !(s && typeof s.getBoundingClientRect == "function");
  });
}
function hn(t) {
  t === void 0 && (t = {});
  var e = t, n = e.defaultModifiers, s = n === void 0 ? [] : n, i = e.defaultOptions, o = i === void 0 ? qs : i;
  return function(a, c, f) {
    f === void 0 && (f = o);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, qs, o),
      modifiersData: {},
      elements: {
        reference: a,
        popper: c
      },
      attributes: {},
      styles: {}
    }, g = [], w = !1, m = {
      state: d,
      setOptions: function(S) {
        var x = typeof S == "function" ? S(d.options) : S;
        b(), d.options = Object.assign({}, o, d.options, x), d.scrollParents = {
          reference: Re(a) ? Et(a) : a.contextElement ? Et(a.contextElement) : [],
          popper: Et(c)
        };
        var L = pa(ga([].concat(s, d.options.modifiers)));
        return d.orderedModifiers = L.filter(function(_) {
          return _.enabled;
        }), C(), m.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!w) {
          var S = d.elements, x = S.reference, L = S.popper;
          if (Gs(x, L)) {
            d.rects = {
              reference: fa(x, At(L), d.options.strategy === "fixed"),
              popper: is(L)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(D) {
              return d.modifiersData[D.name] = Object.assign({}, D.data);
            });
            for (var _ = 0; _ < d.orderedModifiers.length; _++) {
              if (d.reset === !0) {
                d.reset = !1, _ = -1;
                continue;
              }
              var A = d.orderedModifiers[_], T = A.fn, $ = A.options, M = $ === void 0 ? {} : $, I = A.name;
              typeof T == "function" && (d = T({
                state: d,
                options: M,
                name: I,
                instance: m
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: ma(function() {
        return new Promise(function(E) {
          m.forceUpdate(), E(d);
        });
      }),
      destroy: function() {
        b(), w = !0;
      }
    };
    if (!Gs(a, c))
      return m;
    m.setOptions(f).then(function(E) {
      !w && f.onFirstUpdate && f.onFirstUpdate(E);
    });
    function C() {
      d.orderedModifiers.forEach(function(E) {
        var S = E.name, x = E.options, L = x === void 0 ? {} : x, _ = E.effect;
        if (typeof _ == "function") {
          var A = _({
            state: d,
            name: S,
            instance: m,
            options: L
          }), T = function() {
          };
          g.push(A || T);
        }
      });
    }
    function b() {
      g.forEach(function(E) {
        return E();
      }), g = [];
    }
    return m;
  };
}
var wa = /* @__PURE__ */ hn(), ba = [as, ds, rs, ss], _a = /* @__PURE__ */ hn({
  defaultModifiers: ba
}), va = [as, ds, rs, ss, io, no, oo, Ji, so], fs = /* @__PURE__ */ hn({
  defaultModifiers: va
});
const ro = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain: Fi,
  afterRead: Hi,
  afterWrite: Yi,
  applyStyles: ss,
  arrow: Ji,
  auto: dn,
  basePlacements: lt,
  beforeMain: ji,
  beforeRead: Ri,
  beforeWrite: zi,
  bottom: U,
  clippingParents: Mi,
  computeStyles: rs,
  createPopper: fs,
  createPopperBase: wa,
  createPopperLite: _a,
  detectOverflow: st,
  end: Je,
  eventListeners: as,
  flip: no,
  hide: so,
  left: j,
  main: Wi,
  modifierPhases: Ui,
  offset: io,
  placements: ts,
  popper: Ue,
  popperGenerator: hn,
  popperOffsets: ds,
  preventOverflow: oo,
  read: Vi,
  reference: Bi,
  right: q,
  start: Be,
  top: H,
  variationPlacements: Kn,
  viewport: es,
  write: Ki
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * Bootstrap v5.3.3 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
const be = /* @__PURE__ */ new Map(), $n = {
  set(t, e, n) {
    be.has(t) || be.set(t, /* @__PURE__ */ new Map());
    const s = be.get(t);
    if (!s.has(e) && s.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`);
      return;
    }
    s.set(e, n);
  },
  get(t, e) {
    return be.has(t) && be.get(t).get(e) || null;
  },
  remove(t, e) {
    if (!be.has(t))
      return;
    const n = be.get(t);
    n.delete(e), n.size === 0 && be.delete(t);
  }
}, Ea = 1e6, ya = 1e3, qn = "transitionend", ao = (t) => (t && window.CSS && window.CSS.escape && (t = t.replace(/#([^\s"#']+)/g, (e, n) => `#${CSS.escape(n)}`)), t), Aa = (t) => t == null ? `${t}` : Object.prototype.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase(), Ta = (t) => {
  do
    t += Math.floor(Math.random() * Ea);
  while (document.getElementById(t));
  return t;
}, Ca = (t) => {
  if (!t)
    return 0;
  let {
    transitionDuration: e,
    transitionDelay: n
  } = window.getComputedStyle(t);
  const s = Number.parseFloat(e), i = Number.parseFloat(n);
  return !s && !i ? 0 : (e = e.split(",")[0], n = n.split(",")[0], (Number.parseFloat(e) + Number.parseFloat(n)) * ya);
}, lo = (t) => {
  t.dispatchEvent(new Event(qn));
}, fe = (t) => !t || typeof t != "object" ? !1 : (typeof t.jquery < "u" && (t = t[0]), typeof t.nodeType < "u"), Ee = (t) => fe(t) ? t.jquery ? t[0] : t : typeof t == "string" && t.length > 0 ? document.querySelector(ao(t)) : null, ct = (t) => {
  if (!fe(t) || t.getClientRects().length === 0)
    return !1;
  const e = getComputedStyle(t).getPropertyValue("visibility") === "visible", n = t.closest("details:not([open])");
  if (!n)
    return e;
  if (n !== t) {
    const s = t.closest("summary");
    if (s && s.parentNode !== n || s === null)
      return !1;
  }
  return e;
}, ye = (t) => !t || t.nodeType !== Node.ELEMENT_NODE || t.classList.contains("disabled") ? !0 : typeof t.disabled < "u" ? t.disabled : t.hasAttribute("disabled") && t.getAttribute("disabled") !== "false", co = (t) => {
  if (!document.documentElement.attachShadow)
    return null;
  if (typeof t.getRootNode == "function") {
    const e = t.getRootNode();
    return e instanceof ShadowRoot ? e : null;
  }
  return t instanceof ShadowRoot ? t : t.parentNode ? co(t.parentNode) : null;
}, Qt = () => {
}, Tt = (t) => {
  t.offsetHeight;
}, uo = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, xn = [], Oa = (t) => {
  document.readyState === "loading" ? (xn.length || document.addEventListener("DOMContentLoaded", () => {
    for (const e of xn)
      e();
  }), xn.push(t)) : t();
}, ee = () => document.documentElement.dir === "rtl", se = (t) => {
  Oa(() => {
    const e = uo();
    if (e) {
      const n = t.NAME, s = e.fn[n];
      e.fn[n] = t.jQueryInterface, e.fn[n].Constructor = t, e.fn[n].noConflict = () => (e.fn[n] = s, t.jQueryInterface);
    }
  });
}, W = (t, e = [], n = t) => typeof t == "function" ? t(...e) : n, fo = (t, e, n = !0) => {
  if (!n) {
    W(t);
    return;
  }
  const i = Ca(e) + 5;
  let o = !1;
  const r = ({
    target: a
  }) => {
    a === e && (o = !0, e.removeEventListener(qn, r), W(t));
  };
  e.addEventListener(qn, r), setTimeout(() => {
    o || lo(e);
  }, i);
}, hs = (t, e, n, s) => {
  const i = t.length;
  let o = t.indexOf(e);
  return o === -1 ? !n && s ? t[i - 1] : t[0] : (o += n ? 1 : -1, s && (o = (o + i) % i), t[Math.max(0, Math.min(o, i - 1))]);
}, Sa = /[^.]*(?=\..*)\.|.*/, $a = /\..*/, xa = /::\d+$/, Ln = {};
let Xs = 1;
const ho = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, La = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
function po(t, e) {
  return e && `${e}::${Xs++}` || t.uidEvent || Xs++;
}
function mo(t) {
  const e = po(t);
  return t.uidEvent = e, Ln[e] = Ln[e] || {}, Ln[e];
}
function ka(t, e) {
  return function n(s) {
    return ps(s, {
      delegateTarget: t
    }), n.oneOff && u.off(t, s.type, e), e.apply(t, [s]);
  };
}
function Na(t, e, n) {
  return function s(i) {
    const o = t.querySelectorAll(e);
    for (let {
      target: r
    } = i; r && r !== this; r = r.parentNode)
      for (const a of o)
        if (a === r)
          return ps(i, {
            delegateTarget: r
          }), s.oneOff && u.off(t, i.type, e, n), n.apply(r, [i]);
  };
}
function go(t, e, n = null) {
  return Object.values(t).find((s) => s.callable === e && s.delegationSelector === n);
}
function wo(t, e, n) {
  const s = typeof e == "string", i = s ? n : e || n;
  let o = bo(t);
  return La.has(o) || (o = t), [s, i, o];
}
function Qs(t, e, n, s, i) {
  if (typeof e != "string" || !t)
    return;
  let [o, r, a] = wo(e, n, s);
  e in ho && (r = ((C) => function(b) {
    if (!b.relatedTarget || b.relatedTarget !== b.delegateTarget && !b.delegateTarget.contains(b.relatedTarget))
      return C.call(this, b);
  })(r));
  const c = mo(t), f = c[a] || (c[a] = {}), d = go(f, r, o ? n : null);
  if (d) {
    d.oneOff = d.oneOff && i;
    return;
  }
  const g = po(r, e.replace(Sa, "")), w = o ? Na(t, n, r) : ka(t, r);
  w.delegationSelector = o ? n : null, w.callable = r, w.oneOff = i, w.uidEvent = g, f[g] = w, t.addEventListener(a, w, o);
}
function Gn(t, e, n, s, i) {
  const o = go(e[n], s, i);
  o && (t.removeEventListener(n, o, !!i), delete e[n][o.uidEvent]);
}
function Da(t, e, n, s) {
  const i = e[n] || {};
  for (const [o, r] of Object.entries(i))
    o.includes(s) && Gn(t, e, n, r.callable, r.delegationSelector);
}
function bo(t) {
  return t = t.replace($a, ""), ho[t] || t;
}
const u = {
  on(t, e, n, s) {
    Qs(t, e, n, s, !1);
  },
  one(t, e, n, s) {
    Qs(t, e, n, s, !0);
  },
  off(t, e, n, s) {
    if (typeof e != "string" || !t)
      return;
    const [i, o, r] = wo(e, n, s), a = r !== e, c = mo(t), f = c[r] || {}, d = e.startsWith(".");
    if (typeof o < "u") {
      if (!Object.keys(f).length)
        return;
      Gn(t, c, r, o, i ? n : null);
      return;
    }
    if (d)
      for (const g of Object.keys(c))
        Da(t, c, g, e.slice(1));
    for (const [g, w] of Object.entries(f)) {
      const m = g.replace(xa, "");
      (!a || e.includes(m)) && Gn(t, c, r, w.callable, w.delegationSelector);
    }
  },
  trigger(t, e, n) {
    if (typeof e != "string" || !t)
      return null;
    const s = uo(), i = bo(e), o = e !== i;
    let r = null, a = !0, c = !0, f = !1;
    o && s && (r = s.Event(e, n), s(t).trigger(r), a = !r.isPropagationStopped(), c = !r.isImmediatePropagationStopped(), f = r.isDefaultPrevented());
    const d = ps(new Event(e, {
      bubbles: a,
      cancelable: !0
    }), n);
    return f && d.preventDefault(), c && t.dispatchEvent(d), d.defaultPrevented && r && r.preventDefault(), d;
  }
};
function ps(t, e = {}) {
  for (const [n, s] of Object.entries(e))
    try {
      t[n] = s;
    } catch {
      Object.defineProperty(t, n, {
        configurable: !0,
        get() {
          return s;
        }
      });
    }
  return t;
}
function Zs(t) {
  if (t === "true")
    return !0;
  if (t === "false")
    return !1;
  if (t === Number(t).toString())
    return Number(t);
  if (t === "" || t === "null")
    return null;
  if (typeof t != "string")
    return t;
  try {
    return JSON.parse(decodeURIComponent(t));
  } catch {
    return t;
  }
}
function kn(t) {
  return t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
const he = {
  setDataAttribute(t, e, n) {
    t.setAttribute(`data-bs-${kn(e)}`, n);
  },
  removeDataAttribute(t, e) {
    t.removeAttribute(`data-bs-${kn(e)}`);
  },
  getDataAttributes(t) {
    if (!t)
      return {};
    const e = {}, n = Object.keys(t.dataset).filter((s) => s.startsWith("bs") && !s.startsWith("bsConfig"));
    for (const s of n) {
      let i = s.replace(/^bs/, "");
      i = i.charAt(0).toLowerCase() + i.slice(1, i.length), e[i] = Zs(t.dataset[s]);
    }
    return e;
  },
  getDataAttribute(t, e) {
    return Zs(t.getAttribute(`data-bs-${kn(e)}`));
  }
};
class Ct {
  // Getters
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  _getConfig(e) {
    return e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
  }
  _configAfterMerge(e) {
    return e;
  }
  _mergeConfigObj(e, n) {
    const s = fe(n) ? he.getDataAttribute(n, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof s == "object" ? s : {},
      ...fe(n) ? he.getDataAttributes(n) : {},
      ...typeof e == "object" ? e : {}
    };
  }
  _typeCheckConfig(e, n = this.constructor.DefaultType) {
    for (const [s, i] of Object.entries(n)) {
      const o = e[s], r = fe(o) ? "element" : Aa(o);
      if (!new RegExp(i).test(r))
        throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${r}" but expected type "${i}".`);
    }
  }
}
const Ia = "5.3.3";
class re extends Ct {
  constructor(e, n) {
    super(), e = Ee(e), e && (this._element = e, this._config = this._getConfig(n), $n.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    $n.remove(this._element, this.constructor.DATA_KEY), u.off(this._element, this.constructor.EVENT_KEY);
    for (const e of Object.getOwnPropertyNames(this))
      this[e] = null;
  }
  _queueCallback(e, n, s = !0) {
    fo(e, n, s);
  }
  _getConfig(e) {
    return e = this._mergeConfigObj(e, this._element), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
  }
  // Static
  static getInstance(e) {
    return $n.get(Ee(e), this.DATA_KEY);
  }
  static getOrCreateInstance(e, n = {}) {
    return this.getInstance(e) || new this(e, typeof n == "object" ? n : null);
  }
  static get VERSION() {
    return Ia;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(e) {
    return `${e}${this.EVENT_KEY}`;
  }
}
const Nn = (t) => {
  let e = t.getAttribute("data-bs-target");
  if (!e || e === "#") {
    let n = t.getAttribute("href");
    if (!n || !n.includes("#") && !n.startsWith("."))
      return null;
    n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`), e = n && n !== "#" ? n.trim() : null;
  }
  return e ? e.split(",").map((n) => ao(n)).join(",") : null;
}, h = {
  find(t, e = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(e, t));
  },
  findOne(t, e = document.documentElement) {
    return Element.prototype.querySelector.call(e, t);
  },
  children(t, e) {
    return [].concat(...t.children).filter((n) => n.matches(e));
  },
  parents(t, e) {
    const n = [];
    let s = t.parentNode.closest(e);
    for (; s; )
      n.push(s), s = s.parentNode.closest(e);
    return n;
  },
  prev(t, e) {
    let n = t.previousElementSibling;
    for (; n; ) {
      if (n.matches(e))
        return [n];
      n = n.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(t, e) {
    let n = t.nextElementSibling;
    for (; n; ) {
      if (n.matches(e))
        return [n];
      n = n.nextElementSibling;
    }
    return [];
  },
  focusableChildren(t) {
    const e = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((n) => `${n}:not([tabindex^="-"])`).join(",");
    return this.find(e, t).filter((n) => !ye(n) && ct(n));
  },
  getSelectorFromElement(t) {
    const e = Nn(t);
    return e && h.findOne(e) ? e : null;
  },
  getElementFromSelector(t) {
    const e = Nn(t);
    return e ? h.findOne(e) : null;
  },
  getMultipleElementsFromSelector(t) {
    const e = Nn(t);
    return e ? h.find(e) : [];
  }
}, pn = (t, e = "hide") => {
  const n = `click.dismiss${t.EVENT_KEY}`, s = t.NAME;
  u.on(document, n, `[data-bs-dismiss="${s}"]`, function(i) {
    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), ye(this))
      return;
    const o = h.getElementFromSelector(this) || this.closest(`.${s}`);
    t.getOrCreateInstance(o)[e]();
  });
}, Pa = "alert", Ma = "bs.alert", _o = `.${Ma}`, Ba = `close${_o}`, Ra = `closed${_o}`, Va = "fade", Ha = "show";
class mn extends re {
  // Getters
  static get NAME() {
    return Pa;
  }
  // Public
  close() {
    if (u.trigger(this._element, Ba).defaultPrevented)
      return;
    this._element.classList.remove(Ha);
    const n = this._element.classList.contains(Va);
    this._queueCallback(() => this._destroyElement(), this._element, n);
  }
  // Private
  _destroyElement() {
    this._element.remove(), u.trigger(this._element, Ra), this.dispose();
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const n = mn.getOrCreateInstance(this);
      if (typeof e == "string") {
        if (n[e] === void 0 || e.startsWith("_") || e === "constructor")
          throw new TypeError(`No method named "${e}"`);
        n[e](this);
      }
    });
  }
}
pn(mn, "close");
se(mn);
const ja = "button", Wa = "bs.button", Fa = `.${Wa}`, za = ".data-api", Ka = "active", Js = '[data-bs-toggle="button"]', Ya = `click${Fa}${za}`;
class gn extends re {
  // Getters
  static get NAME() {
    return ja;
  }
  // Public
  toggle() {
    this._element.setAttribute("aria-pressed", this._element.classList.toggle(Ka));
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const n = gn.getOrCreateInstance(this);
      e === "toggle" && n[e]();
    });
  }
}
u.on(document, Ya, Js, (t) => {
  t.preventDefault();
  const e = t.target.closest(Js);
  gn.getOrCreateInstance(e).toggle();
});
se(gn);
const Ua = "swipe", ut = ".bs.swipe", qa = `touchstart${ut}`, Ga = `touchmove${ut}`, Xa = `touchend${ut}`, Qa = `pointerdown${ut}`, Za = `pointerup${ut}`, Ja = "touch", el = "pen", tl = "pointer-event", nl = 40, sl = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
}, il = {
  endCallback: "(function|null)",
  leftCallback: "(function|null)",
  rightCallback: "(function|null)"
};
class Zt extends Ct {
  constructor(e, n) {
    super(), this._element = e, !(!e || !Zt.isSupported()) && (this._config = this._getConfig(n), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents());
  }
  // Getters
  static get Default() {
    return sl;
  }
  static get DefaultType() {
    return il;
  }
  static get NAME() {
    return Ua;
  }
  // Public
  dispose() {
    u.off(this._element, ut);
  }
  // Private
  _start(e) {
    if (!this._supportPointerEvents) {
      this._deltaX = e.touches[0].clientX;
      return;
    }
    this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX);
  }
  _end(e) {
    this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX), this._handleSwipe(), W(this._config.endCallback);
  }
  _move(e) {
    this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const e = Math.abs(this._deltaX);
    if (e <= nl)
      return;
    const n = e / this._deltaX;
    this._deltaX = 0, n && W(n > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents ? (u.on(this._element, Qa, (e) => this._start(e)), u.on(this._element, Za, (e) => this._end(e)), this._element.classList.add(tl)) : (u.on(this._element, qa, (e) => this._start(e)), u.on(this._element, Ga, (e) => this._move(e)), u.on(this._element, Xa, (e) => this._end(e)));
  }
  _eventIsPointerPenTouch(e) {
    return this._supportPointerEvents && (e.pointerType === el || e.pointerType === Ja);
  }
  // Static
  static isSupported() {
    return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const ol = "carousel", rl = "bs.carousel", Ce = `.${rl}`, vo = ".data-api", al = "ArrowLeft", ll = "ArrowRight", cl = 500, bt = "next", Ke = "prev", qe = "left", qt = "right", ul = `slide${Ce}`, Dn = `slid${Ce}`, dl = `keydown${Ce}`, fl = `mouseenter${Ce}`, hl = `mouseleave${Ce}`, pl = `dragstart${Ce}`, ml = `load${Ce}${vo}`, gl = `click${Ce}${vo}`, Eo = "carousel", Ht = "active", wl = "slide", bl = "carousel-item-end", _l = "carousel-item-start", vl = "carousel-item-next", El = "carousel-item-prev", yo = ".active", Ao = ".carousel-item", yl = yo + Ao, Al = ".carousel-item img", Tl = ".carousel-indicators", Cl = "[data-bs-slide], [data-bs-slide-to]", Ol = '[data-bs-ride="carousel"]', Sl = {
  [al]: qt,
  [ll]: qe
}, $l = {
  interval: 5e3,
  keyboard: !0,
  pause: "hover",
  ride: !1,
  touch: !0,
  wrap: !0
}, xl = {
  interval: "(number|boolean)",
  // TODO:v6 remove boolean support
  keyboard: "boolean",
  pause: "(string|boolean)",
  ride: "(boolean|string)",
  touch: "boolean",
  wrap: "boolean"
};
class Ot extends re {
  constructor(e, n) {
    super(e, n), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = h.findOne(Tl, this._element), this._addEventListeners(), this._config.ride === Eo && this.cycle();
  }
  // Getters
  static get Default() {
    return $l;
  }
  static get DefaultType() {
    return xl;
  }
  static get NAME() {
    return ol;
  }
  // Public
  next() {
    this._slide(bt);
  }
  nextWhenVisible() {
    !document.hidden && ct(this._element) && this.next();
  }
  prev() {
    this._slide(Ke);
  }
  pause() {
    this._isSliding && lo(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        u.one(this._element, Dn, () => this.cycle());
        return;
      }
      this.cycle();
    }
  }
  to(e) {
    const n = this._getItems();
    if (e > n.length - 1 || e < 0)
      return;
    if (this._isSliding) {
      u.one(this._element, Dn, () => this.to(e));
      return;
    }
    const s = this._getItemIndex(this._getActive());
    if (s === e)
      return;
    const i = e > s ? bt : Ke;
    this._slide(i, n[e]);
  }
  dispose() {
    this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
  }
  // Private
  _configAfterMerge(e) {
    return e.defaultInterval = e.interval, e;
  }
  _addEventListeners() {
    this._config.keyboard && u.on(this._element, dl, (e) => this._keydown(e)), this._config.pause === "hover" && (u.on(this._element, fl, () => this.pause()), u.on(this._element, hl, () => this._maybeEnableCycle())), this._config.touch && Zt.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const s of h.find(Al, this._element))
      u.on(s, pl, (i) => i.preventDefault());
    const n = {
      leftCallback: () => this._slide(this._directionToOrder(qe)),
      rightCallback: () => this._slide(this._directionToOrder(qt)),
      endCallback: () => {
        this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), cl + this._config.interval));
      }
    };
    this._swipeHelper = new Zt(this._element, n);
  }
  _keydown(e) {
    if (/input|textarea/i.test(e.target.tagName))
      return;
    const n = Sl[e.key];
    n && (e.preventDefault(), this._slide(this._directionToOrder(n)));
  }
  _getItemIndex(e) {
    return this._getItems().indexOf(e);
  }
  _setActiveIndicatorElement(e) {
    if (!this._indicatorsElement)
      return;
    const n = h.findOne(yo, this._indicatorsElement);
    n.classList.remove(Ht), n.removeAttribute("aria-current");
    const s = h.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
    s && (s.classList.add(Ht), s.setAttribute("aria-current", "true"));
  }
  _updateInterval() {
    const e = this._activeElement || this._getActive();
    if (!e)
      return;
    const n = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
    this._config.interval = n || this._config.defaultInterval;
  }
  _slide(e, n = null) {
    if (this._isSliding)
      return;
    const s = this._getActive(), i = e === bt, o = n || hs(this._getItems(), s, i, this._config.wrap);
    if (o === s)
      return;
    const r = this._getItemIndex(o), a = (m) => u.trigger(this._element, m, {
      relatedTarget: o,
      direction: this._orderToDirection(e),
      from: this._getItemIndex(s),
      to: r
    });
    if (a(ul).defaultPrevented || !s || !o)
      return;
    const f = !!this._interval;
    this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(r), this._activeElement = o;
    const d = i ? _l : bl, g = i ? vl : El;
    o.classList.add(g), Tt(o), s.classList.add(d), o.classList.add(d);
    const w = () => {
      o.classList.remove(d, g), o.classList.add(Ht), s.classList.remove(Ht, g, d), this._isSliding = !1, a(Dn);
    };
    this._queueCallback(w, s, this._isAnimated()), f && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(wl);
  }
  _getActive() {
    return h.findOne(yl, this._element);
  }
  _getItems() {
    return h.find(Ao, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), this._interval = null);
  }
  _directionToOrder(e) {
    return ee() ? e === qe ? Ke : bt : e === qe ? bt : Ke;
  }
  _orderToDirection(e) {
    return ee() ? e === Ke ? qe : qt : e === Ke ? qt : qe;
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const n = Ot.getOrCreateInstance(this, e);
      if (typeof e == "number") {
        n.to(e);
        return;
      }
      if (typeof e == "string") {
        if (n[e] === void 0 || e.startsWith("_") || e === "constructor")
          throw new TypeError(`No method named "${e}"`);
        n[e]();
      }
    });
  }
}
u.on(document, gl, Cl, function(t) {
  const e = h.getElementFromSelector(this);
  if (!e || !e.classList.contains(Eo))
    return;
  t.preventDefault();
  const n = Ot.getOrCreateInstance(e), s = this.getAttribute("data-bs-slide-to");
  if (s) {
    n.to(s), n._maybeEnableCycle();
    return;
  }
  if (he.getDataAttribute(this, "slide") === "next") {
    n.next(), n._maybeEnableCycle();
    return;
  }
  n.prev(), n._maybeEnableCycle();
});
u.on(window, ml, () => {
  const t = h.find(Ol);
  for (const e of t)
    Ot.getOrCreateInstance(e);
});
se(Ot);
const Ll = "collapse", kl = "bs.collapse", St = `.${kl}`, Nl = ".data-api", Dl = `show${St}`, Il = `shown${St}`, Pl = `hide${St}`, Ml = `hidden${St}`, Bl = `click${St}${Nl}`, In = "show", Xe = "collapse", jt = "collapsing", Rl = "collapsed", Vl = `:scope .${Xe} .${Xe}`, Hl = "collapse-horizontal", jl = "width", Wl = "height", Fl = ".collapse.show, .collapse.collapsing", Xn = '[data-bs-toggle="collapse"]', zl = {
  parent: null,
  toggle: !0
}, Kl = {
  parent: "(null|element)",
  toggle: "boolean"
};
class yt extends re {
  constructor(e, n) {
    super(e, n), this._isTransitioning = !1, this._triggerArray = [];
    const s = h.find(Xn);
    for (const i of s) {
      const o = h.getSelectorFromElement(i), r = h.find(o).filter((a) => a === this._element);
      o !== null && r.length && this._triggerArray.push(i);
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  // Getters
  static get Default() {
    return zl;
  }
  static get DefaultType() {
    return Kl;
  }
  static get NAME() {
    return Ll;
  }
  // Public
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown())
      return;
    let e = [];
    if (this._config.parent && (e = this._getFirstLevelChildren(Fl).filter((a) => a !== this._element).map((a) => yt.getOrCreateInstance(a, {
      toggle: !1
    }))), e.length && e[0]._isTransitioning || u.trigger(this._element, Dl).defaultPrevented)
      return;
    for (const a of e)
      a.hide();
    const s = this._getDimension();
    this._element.classList.remove(Xe), this._element.classList.add(jt), this._element.style[s] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
    const i = () => {
      this._isTransitioning = !1, this._element.classList.remove(jt), this._element.classList.add(Xe, In), this._element.style[s] = "", u.trigger(this._element, Il);
    }, r = `scroll${s[0].toUpperCase() + s.slice(1)}`;
    this._queueCallback(i, this._element, !0), this._element.style[s] = `${this._element[r]}px`;
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || u.trigger(this._element, Pl).defaultPrevented)
      return;
    const n = this._getDimension();
    this._element.style[n] = `${this._element.getBoundingClientRect()[n]}px`, Tt(this._element), this._element.classList.add(jt), this._element.classList.remove(Xe, In);
    for (const i of this._triggerArray) {
      const o = h.getElementFromSelector(i);
      o && !this._isShown(o) && this._addAriaAndCollapsedClass([i], !1);
    }
    this._isTransitioning = !0;
    const s = () => {
      this._isTransitioning = !1, this._element.classList.remove(jt), this._element.classList.add(Xe), u.trigger(this._element, Ml);
    };
    this._element.style[n] = "", this._queueCallback(s, this._element, !0);
  }
  _isShown(e = this._element) {
    return e.classList.contains(In);
  }
  // Private
  _configAfterMerge(e) {
    return e.toggle = !!e.toggle, e.parent = Ee(e.parent), e;
  }
  _getDimension() {
    return this._element.classList.contains(Hl) ? jl : Wl;
  }
  _initializeChildren() {
    if (!this._config.parent)
      return;
    const e = this._getFirstLevelChildren(Xn);
    for (const n of e) {
      const s = h.getElementFromSelector(n);
      s && this._addAriaAndCollapsedClass([n], this._isShown(s));
    }
  }
  _getFirstLevelChildren(e) {
    const n = h.find(Vl, this._config.parent);
    return h.find(e, this._config.parent).filter((s) => !n.includes(s));
  }
  _addAriaAndCollapsedClass(e, n) {
    if (e.length)
      for (const s of e)
        s.classList.toggle(Rl, !n), s.setAttribute("aria-expanded", n);
  }
  // Static
  static jQueryInterface(e) {
    const n = {};
    return typeof e == "string" && /show|hide/.test(e) && (n.toggle = !1), this.each(function() {
      const s = yt.getOrCreateInstance(this, n);
      if (typeof e == "string") {
        if (typeof s[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        s[e]();
      }
    });
  }
}
u.on(document, Bl, Xn, function(t) {
  (t.target.tagName === "A" || t.delegateTarget && t.delegateTarget.tagName === "A") && t.preventDefault();
  for (const e of h.getMultipleElementsFromSelector(this))
    yt.getOrCreateInstance(e, {
      toggle: !1
    }).toggle();
});
se(yt);
const ei = "dropdown", Yl = "bs.dropdown", He = `.${Yl}`, ms = ".data-api", Ul = "Escape", ti = "Tab", ql = "ArrowUp", ni = "ArrowDown", Gl = 2, Xl = `hide${He}`, Ql = `hidden${He}`, Zl = `show${He}`, Jl = `shown${He}`, To = `click${He}${ms}`, Co = `keydown${He}${ms}`, ec = `keyup${He}${ms}`, Ge = "show", tc = "dropup", nc = "dropend", sc = "dropstart", ic = "dropup-center", oc = "dropdown-center", De = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', rc = `${De}.${Ge}`, Gt = ".dropdown-menu", ac = ".navbar", lc = ".navbar-nav", cc = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", uc = ee() ? "top-end" : "top-start", dc = ee() ? "top-start" : "top-end", fc = ee() ? "bottom-end" : "bottom-start", hc = ee() ? "bottom-start" : "bottom-end", pc = ee() ? "left-start" : "right-start", mc = ee() ? "right-start" : "left-start", gc = "top", wc = "bottom", bc = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, _c = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
class ce extends re {
  constructor(e, n) {
    super(e, n), this._popper = null, this._parent = this._element.parentNode, this._menu = h.next(this._element, Gt)[0] || h.prev(this._element, Gt)[0] || h.findOne(Gt, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return bc;
  }
  static get DefaultType() {
    return _c;
  }
  static get NAME() {
    return ei;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (ye(this._element) || this._isShown())
      return;
    const e = {
      relatedTarget: this._element
    };
    if (!u.trigger(this._element, Zl, e).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(lc))
        for (const s of [].concat(...document.body.children))
          u.on(s, "mouseover", Qt);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Ge), this._element.classList.add(Ge), u.trigger(this._element, Jl, e);
    }
  }
  hide() {
    if (ye(this._element) || !this._isShown())
      return;
    const e = {
      relatedTarget: this._element
    };
    this._completeHide(e);
  }
  dispose() {
    this._popper && this._popper.destroy(), super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
  }
  // Private
  _completeHide(e) {
    if (!u.trigger(this._element, Xl, e).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const s of [].concat(...document.body.children))
          u.off(s, "mouseover", Qt);
      this._popper && this._popper.destroy(), this._menu.classList.remove(Ge), this._element.classList.remove(Ge), this._element.setAttribute("aria-expanded", "false"), he.removeDataAttribute(this._menu, "popper"), u.trigger(this._element, Ql, e);
    }
  }
  _getConfig(e) {
    if (e = super._getConfig(e), typeof e.reference == "object" && !fe(e.reference) && typeof e.reference.getBoundingClientRect != "function")
      throw new TypeError(`${ei.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return e;
  }
  _createPopper() {
    if (typeof ro > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let e = this._element;
    this._config.reference === "parent" ? e = this._parent : fe(this._config.reference) ? e = Ee(this._config.reference) : typeof this._config.reference == "object" && (e = this._config.reference);
    const n = this._getPopperConfig();
    this._popper = fs(e, this._menu, n);
  }
  _isShown() {
    return this._menu.classList.contains(Ge);
  }
  _getPlacement() {
    const e = this._parent;
    if (e.classList.contains(nc))
      return pc;
    if (e.classList.contains(sc))
      return mc;
    if (e.classList.contains(ic))
      return gc;
    if (e.classList.contains(oc))
      return wc;
    const n = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return e.classList.contains(tc) ? n ? dc : uc : n ? hc : fc;
  }
  _detectNavbar() {
    return this._element.closest(ac) !== null;
  }
  _getOffset() {
    const {
      offset: e
    } = this._config;
    return typeof e == "string" ? e.split(",").map((n) => Number.parseInt(n, 10)) : typeof e == "function" ? (n) => e(n, this._element) : e;
  }
  _getPopperConfig() {
    const e = {
      placement: this._getPlacement(),
      modifiers: [{
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }]
    };
    return (this._inNavbar || this._config.display === "static") && (he.setDataAttribute(this._menu, "popper", "static"), e.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...e,
      ...W(this._config.popperConfig, [e])
    };
  }
  _selectMenuItem({
    key: e,
    target: n
  }) {
    const s = h.find(cc, this._menu).filter((i) => ct(i));
    s.length && hs(s, n, e === ni, !s.includes(n)).focus();
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const n = ce.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (typeof n[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        n[e]();
      }
    });
  }
  static clearMenus(e) {
    if (e.button === Gl || e.type === "keyup" && e.key !== ti)
      return;
    const n = h.find(rc);
    for (const s of n) {
      const i = ce.getInstance(s);
      if (!i || i._config.autoClose === !1)
        continue;
      const o = e.composedPath(), r = o.includes(i._menu);
      if (o.includes(i._element) || i._config.autoClose === "inside" && !r || i._config.autoClose === "outside" && r || i._menu.contains(e.target) && (e.type === "keyup" && e.key === ti || /input|select|option|textarea|form/i.test(e.target.tagName)))
        continue;
      const a = {
        relatedTarget: i._element
      };
      e.type === "click" && (a.clickEvent = e), i._completeHide(a);
    }
  }
  static dataApiKeydownHandler(e) {
    const n = /input|textarea/i.test(e.target.tagName), s = e.key === Ul, i = [ql, ni].includes(e.key);
    if (!i && !s || n && !s)
      return;
    e.preventDefault();
    const o = this.matches(De) ? this : h.prev(this, De)[0] || h.next(this, De)[0] || h.findOne(De, e.delegateTarget.parentNode), r = ce.getOrCreateInstance(o);
    if (i) {
      e.stopPropagation(), r.show(), r._selectMenuItem(e);
      return;
    }
    r._isShown() && (e.stopPropagation(), r.hide(), o.focus());
  }
}
u.on(document, Co, De, ce.dataApiKeydownHandler);
u.on(document, Co, Gt, ce.dataApiKeydownHandler);
u.on(document, To, ce.clearMenus);
u.on(document, ec, ce.clearMenus);
u.on(document, To, De, function(t) {
  t.preventDefault(), ce.getOrCreateInstance(this).toggle();
});
se(ce);
const Oo = "backdrop", vc = "fade", si = "show", ii = `mousedown.bs.${Oo}`, Ec = {
  className: "modal-backdrop",
  clickCallback: null,
  isAnimated: !1,
  isVisible: !0,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: "body"
  // give the choice to place backdrop under different elements
}, yc = {
  className: "string",
  clickCallback: "(function|null)",
  isAnimated: "boolean",
  isVisible: "boolean",
  rootElement: "(element|string)"
};
class So extends Ct {
  constructor(e) {
    super(), this._config = this._getConfig(e), this._isAppended = !1, this._element = null;
  }
  // Getters
  static get Default() {
    return Ec;
  }
  static get DefaultType() {
    return yc;
  }
  static get NAME() {
    return Oo;
  }
  // Public
  show(e) {
    if (!this._config.isVisible) {
      W(e);
      return;
    }
    this._append();
    const n = this._getElement();
    this._config.isAnimated && Tt(n), n.classList.add(si), this._emulateAnimation(() => {
      W(e);
    });
  }
  hide(e) {
    if (!this._config.isVisible) {
      W(e);
      return;
    }
    this._getElement().classList.remove(si), this._emulateAnimation(() => {
      this.dispose(), W(e);
    });
  }
  dispose() {
    this._isAppended && (u.off(this._element, ii), this._element.remove(), this._isAppended = !1);
  }
  // Private
  _getElement() {
    if (!this._element) {
      const e = document.createElement("div");
      e.className = this._config.className, this._config.isAnimated && e.classList.add(vc), this._element = e;
    }
    return this._element;
  }
  _configAfterMerge(e) {
    return e.rootElement = Ee(e.rootElement), e;
  }
  _append() {
    if (this._isAppended)
      return;
    const e = this._getElement();
    this._config.rootElement.append(e), u.on(e, ii, () => {
      W(this._config.clickCallback);
    }), this._isAppended = !0;
  }
  _emulateAnimation(e) {
    fo(e, this._getElement(), this._config.isAnimated);
  }
}
const Ac = "focustrap", Tc = "bs.focustrap", Jt = `.${Tc}`, Cc = `focusin${Jt}`, Oc = `keydown.tab${Jt}`, Sc = "Tab", $c = "forward", oi = "backward", xc = {
  autofocus: !0,
  trapElement: null
  // The element to trap focus inside of
}, Lc = {
  autofocus: "boolean",
  trapElement: "element"
};
class $o extends Ct {
  constructor(e) {
    super(), this._config = this._getConfig(e), this._isActive = !1, this._lastTabNavDirection = null;
  }
  // Getters
  static get Default() {
    return xc;
  }
  static get DefaultType() {
    return Lc;
  }
  static get NAME() {
    return Ac;
  }
  // Public
  activate() {
    this._isActive || (this._config.autofocus && this._config.trapElement.focus(), u.off(document, Jt), u.on(document, Cc, (e) => this._handleFocusin(e)), u.on(document, Oc, (e) => this._handleKeydown(e)), this._isActive = !0);
  }
  deactivate() {
    this._isActive && (this._isActive = !1, u.off(document, Jt));
  }
  // Private
  _handleFocusin(e) {
    const {
      trapElement: n
    } = this._config;
    if (e.target === document || e.target === n || n.contains(e.target))
      return;
    const s = h.focusableChildren(n);
    s.length === 0 ? n.focus() : this._lastTabNavDirection === oi ? s[s.length - 1].focus() : s[0].focus();
  }
  _handleKeydown(e) {
    e.key === Sc && (this._lastTabNavDirection = e.shiftKey ? oi : $c);
  }
}
const ri = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", ai = ".sticky-top", Wt = "padding-right", li = "margin-right";
class Qn {
  constructor() {
    this._element = document.body;
  }
  // Public
  getWidth() {
    const e = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - e);
  }
  hide() {
    const e = this.getWidth();
    this._disableOverFlow(), this._setElementAttributes(this._element, Wt, (n) => n + e), this._setElementAttributes(ri, Wt, (n) => n + e), this._setElementAttributes(ai, li, (n) => n - e);
  }
  reset() {
    this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Wt), this._resetElementAttributes(ri, Wt), this._resetElementAttributes(ai, li);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  // Private
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
  }
  _setElementAttributes(e, n, s) {
    const i = this.getWidth(), o = (r) => {
      if (r !== this._element && window.innerWidth > r.clientWidth + i)
        return;
      this._saveInitialAttribute(r, n);
      const a = window.getComputedStyle(r).getPropertyValue(n);
      r.style.setProperty(n, `${s(Number.parseFloat(a))}px`);
    };
    this._applyManipulationCallback(e, o);
  }
  _saveInitialAttribute(e, n) {
    const s = e.style.getPropertyValue(n);
    s && he.setDataAttribute(e, n, s);
  }
  _resetElementAttributes(e, n) {
    const s = (i) => {
      const o = he.getDataAttribute(i, n);
      if (o === null) {
        i.style.removeProperty(n);
        return;
      }
      he.removeDataAttribute(i, n), i.style.setProperty(n, o);
    };
    this._applyManipulationCallback(e, s);
  }
  _applyManipulationCallback(e, n) {
    if (fe(e)) {
      n(e);
      return;
    }
    for (const s of h.find(e, this._element))
      n(s);
  }
}
const kc = "modal", Nc = "bs.modal", te = `.${Nc}`, Dc = ".data-api", Ic = "Escape", Pc = `hide${te}`, Mc = `hidePrevented${te}`, xo = `hidden${te}`, Lo = `show${te}`, Bc = `shown${te}`, Rc = `resize${te}`, Vc = `click.dismiss${te}`, Hc = `mousedown.dismiss${te}`, jc = `keydown.dismiss${te}`, Wc = `click${te}${Dc}`, ci = "modal-open", Fc = "fade", ui = "show", Pn = "modal-static", zc = ".modal.show", Kc = ".modal-dialog", Yc = ".modal-body", Uc = '[data-bs-toggle="modal"]', qc = {
  backdrop: !0,
  focus: !0,
  keyboard: !0
}, Gc = {
  backdrop: "(boolean|string)",
  focus: "boolean",
  keyboard: "boolean"
};
class it extends re {
  constructor(e, n) {
    super(e, n), this._dialog = h.findOne(Kc, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new Qn(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return qc;
  }
  static get DefaultType() {
    return Gc;
  }
  static get NAME() {
    return kc;
  }
  // Public
  toggle(e) {
    return this._isShown ? this.hide() : this.show(e);
  }
  show(e) {
    this._isShown || this._isTransitioning || u.trigger(this._element, Lo, {
      relatedTarget: e
    }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(ci), this._adjustDialog(), this._backdrop.show(() => this._showElement(e)));
  }
  hide() {
    !this._isShown || this._isTransitioning || u.trigger(this._element, Pc).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(ui), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    u.off(window, te), u.off(this._dialog, te), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  // Private
  _initializeBackDrop() {
    return new So({
      isVisible: !!this._config.backdrop,
      // 'static' option will be translated to true, and booleans will keep their value,
      isAnimated: this._isAnimated()
    });
  }
  _initializeFocusTrap() {
    return new $o({
      trapElement: this._element
    });
  }
  _showElement(e) {
    document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
    const n = h.findOne(Yc, this._dialog);
    n && (n.scrollTop = 0), Tt(this._element), this._element.classList.add(ui);
    const s = () => {
      this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, u.trigger(this._element, Bc, {
        relatedTarget: e
      });
    };
    this._queueCallback(s, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    u.on(this._element, jc, (e) => {
      if (e.key === Ic) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }), u.on(window, Rc, () => {
      this._isShown && !this._isTransitioning && this._adjustDialog();
    }), u.on(this._element, Hc, (e) => {
      u.one(this._element, Vc, (n) => {
        if (!(this._element !== e.target || this._element !== n.target)) {
          if (this._config.backdrop === "static") {
            this._triggerBackdropTransition();
            return;
          }
          this._config.backdrop && this.hide();
        }
      });
    });
  }
  _hideModal() {
    this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
      document.body.classList.remove(ci), this._resetAdjustments(), this._scrollBar.reset(), u.trigger(this._element, xo);
    });
  }
  _isAnimated() {
    return this._element.classList.contains(Fc);
  }
  _triggerBackdropTransition() {
    if (u.trigger(this._element, Mc).defaultPrevented)
      return;
    const n = this._element.scrollHeight > document.documentElement.clientHeight, s = this._element.style.overflowY;
    s === "hidden" || this._element.classList.contains(Pn) || (n || (this._element.style.overflowY = "hidden"), this._element.classList.add(Pn), this._queueCallback(() => {
      this._element.classList.remove(Pn), this._queueCallback(() => {
        this._element.style.overflowY = s;
      }, this._dialog);
    }, this._dialog), this._element.focus());
  }
  /**
   * The following methods are used to handle overflowing modals
   */
  _adjustDialog() {
    const e = this._element.scrollHeight > document.documentElement.clientHeight, n = this._scrollBar.getWidth(), s = n > 0;
    if (s && !e) {
      const i = ee() ? "paddingLeft" : "paddingRight";
      this._element.style[i] = `${n}px`;
    }
    if (!s && e) {
      const i = ee() ? "paddingRight" : "paddingLeft";
      this._element.style[i] = `${n}px`;
    }
  }
  _resetAdjustments() {
    this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
  }
  // Static
  static jQueryInterface(e, n) {
    return this.each(function() {
      const s = it.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (typeof s[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        s[e](n);
      }
    });
  }
}
u.on(document, Wc, Uc, function(t) {
  const e = h.getElementFromSelector(this);
  ["A", "AREA"].includes(this.tagName) && t.preventDefault(), u.one(e, Lo, (i) => {
    i.defaultPrevented || u.one(e, xo, () => {
      ct(this) && this.focus();
    });
  });
  const n = h.findOne(zc);
  n && it.getInstance(n).hide(), it.getOrCreateInstance(e).toggle(this);
});
pn(it);
se(it);
const Xc = "offcanvas", Qc = "bs.offcanvas", ge = `.${Qc}`, ko = ".data-api", Zc = `load${ge}${ko}`, Jc = "Escape", di = "show", fi = "showing", hi = "hiding", eu = "offcanvas-backdrop", No = ".offcanvas.show", tu = `show${ge}`, nu = `shown${ge}`, su = `hide${ge}`, pi = `hidePrevented${ge}`, Do = `hidden${ge}`, iu = `resize${ge}`, ou = `click${ge}${ko}`, ru = `keydown.dismiss${ge}`, au = '[data-bs-toggle="offcanvas"]', lu = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, cu = {
  backdrop: "(boolean|string)",
  keyboard: "boolean",
  scroll: "boolean"
};
class Ae extends re {
  constructor(e, n) {
    super(e, n), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
  }
  // Getters
  static get Default() {
    return lu;
  }
  static get DefaultType() {
    return cu;
  }
  static get NAME() {
    return Xc;
  }
  // Public
  toggle(e) {
    return this._isShown ? this.hide() : this.show(e);
  }
  show(e) {
    if (this._isShown || u.trigger(this._element, tu, {
      relatedTarget: e
    }).defaultPrevented)
      return;
    this._isShown = !0, this._backdrop.show(), this._config.scroll || new Qn().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(fi);
    const s = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(di), this._element.classList.remove(fi), u.trigger(this._element, nu, {
        relatedTarget: e
      });
    };
    this._queueCallback(s, this._element, !0);
  }
  hide() {
    if (!this._isShown || u.trigger(this._element, su).defaultPrevented)
      return;
    this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(hi), this._backdrop.hide();
    const n = () => {
      this._element.classList.remove(di, hi), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new Qn().reset(), u.trigger(this._element, Do);
    };
    this._queueCallback(n, this._element, !0);
  }
  dispose() {
    this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  // Private
  _initializeBackDrop() {
    const e = () => {
      if (this._config.backdrop === "static") {
        u.trigger(this._element, pi);
        return;
      }
      this.hide();
    }, n = !!this._config.backdrop;
    return new So({
      className: eu,
      isVisible: n,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: n ? e : null
    });
  }
  _initializeFocusTrap() {
    return new $o({
      trapElement: this._element
    });
  }
  _addEventListeners() {
    u.on(this._element, ru, (e) => {
      if (e.key === Jc) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        u.trigger(this._element, pi);
      }
    });
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const n = Ae.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (n[e] === void 0 || e.startsWith("_") || e === "constructor")
          throw new TypeError(`No method named "${e}"`);
        n[e](this);
      }
    });
  }
}
u.on(document, ou, au, function(t) {
  const e = h.getElementFromSelector(this);
  if (["A", "AREA"].includes(this.tagName) && t.preventDefault(), ye(this))
    return;
  u.one(e, Do, () => {
    ct(this) && this.focus();
  });
  const n = h.findOne(No);
  n && n !== e && Ae.getInstance(n).hide(), Ae.getOrCreateInstance(e).toggle(this);
});
u.on(window, Zc, () => {
  for (const t of h.find(No))
    Ae.getOrCreateInstance(t).show();
});
u.on(window, iu, () => {
  for (const t of h.find("[aria-modal][class*=show][class*=offcanvas-]"))
    getComputedStyle(t).position !== "fixed" && Ae.getOrCreateInstance(t).hide();
});
pn(Ae);
se(Ae);
const uu = /^aria-[\w-]*$/i, Io = {
  // Global attributes allowed on any supplied element below.
  "*": ["class", "dir", "id", "lang", "role", uu],
  a: ["target", "href", "title", "rel"],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  dd: [],
  div: [],
  dl: [],
  dt: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ["src", "srcset", "alt", "title", "width", "height"],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
}, du = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), fu = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, hu = (t, e) => {
  const n = t.nodeName.toLowerCase();
  return e.includes(n) ? du.has(n) ? !!fu.test(t.nodeValue) : !0 : e.filter((s) => s instanceof RegExp).some((s) => s.test(n));
};
function pu(t, e, n) {
  if (!t.length)
    return t;
  if (n && typeof n == "function")
    return n(t);
  const i = new window.DOMParser().parseFromString(t, "text/html"), o = [].concat(...i.body.querySelectorAll("*"));
  for (const r of o) {
    const a = r.nodeName.toLowerCase();
    if (!Object.keys(e).includes(a)) {
      r.remove();
      continue;
    }
    const c = [].concat(...r.attributes), f = [].concat(e["*"] || [], e[a] || []);
    for (const d of c)
      hu(d, f) || r.removeAttribute(d.nodeName);
  }
  return i.body.innerHTML;
}
const mu = "TemplateFactory", gu = {
  allowList: Io,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: "",
  html: !1,
  sanitize: !0,
  sanitizeFn: null,
  template: "<div></div>"
}, wu = {
  allowList: "object",
  content: "object",
  extraClass: "(string|function)",
  html: "boolean",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  template: "string"
}, bu = {
  entry: "(string|element|function|null)",
  selector: "(string|element)"
};
class _u extends Ct {
  constructor(e) {
    super(), this._config = this._getConfig(e);
  }
  // Getters
  static get Default() {
    return gu;
  }
  static get DefaultType() {
    return wu;
  }
  static get NAME() {
    return mu;
  }
  // Public
  getContent() {
    return Object.values(this._config.content).map((e) => this._resolvePossibleFunction(e)).filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(e) {
    return this._checkContent(e), this._config.content = {
      ...this._config.content,
      ...e
    }, this;
  }
  toHtml() {
    const e = document.createElement("div");
    e.innerHTML = this._maybeSanitize(this._config.template);
    for (const [i, o] of Object.entries(this._config.content))
      this._setContent(e, o, i);
    const n = e.children[0], s = this._resolvePossibleFunction(this._config.extraClass);
    return s && n.classList.add(...s.split(" ")), n;
  }
  // Private
  _typeCheckConfig(e) {
    super._typeCheckConfig(e), this._checkContent(e.content);
  }
  _checkContent(e) {
    for (const [n, s] of Object.entries(e))
      super._typeCheckConfig({
        selector: n,
        entry: s
      }, bu);
  }
  _setContent(e, n, s) {
    const i = h.findOne(s, e);
    if (i) {
      if (n = this._resolvePossibleFunction(n), !n) {
        i.remove();
        return;
      }
      if (fe(n)) {
        this._putElementInTemplate(Ee(n), i);
        return;
      }
      if (this._config.html) {
        i.innerHTML = this._maybeSanitize(n);
        return;
      }
      i.textContent = n;
    }
  }
  _maybeSanitize(e) {
    return this._config.sanitize ? pu(e, this._config.allowList, this._config.sanitizeFn) : e;
  }
  _resolvePossibleFunction(e) {
    return W(e, [this]);
  }
  _putElementInTemplate(e, n) {
    if (this._config.html) {
      n.innerHTML = "", n.append(e);
      return;
    }
    n.textContent = e.textContent;
  }
}
const vu = "tooltip", Eu = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), Mn = "fade", yu = "modal", Ft = "show", Au = ".tooltip-inner", mi = `.${yu}`, gi = "hide.bs.modal", _t = "hover", Bn = "focus", Tu = "click", Cu = "manual", Ou = "hide", Su = "hidden", $u = "show", xu = "shown", Lu = "inserted", ku = "click", Nu = "focusin", Du = "focusout", Iu = "mouseenter", Pu = "mouseleave", Mu = {
  AUTO: "auto",
  TOP: "top",
  RIGHT: ee() ? "left" : "right",
  BOTTOM: "bottom",
  LEFT: ee() ? "right" : "left"
}, Bu = {
  allowList: Io,
  animation: !0,
  boundary: "clippingParents",
  container: !1,
  customClass: "",
  delay: 0,
  fallbackPlacements: ["top", "right", "bottom", "left"],
  html: !1,
  offset: [0, 6],
  placement: "top",
  popperConfig: null,
  sanitize: !0,
  sanitizeFn: null,
  selector: !1,
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  title: "",
  trigger: "hover focus"
}, Ru = {
  allowList: "object",
  animation: "boolean",
  boundary: "(string|element)",
  container: "(string|element|boolean)",
  customClass: "(string|function)",
  delay: "(number|object)",
  fallbackPlacements: "array",
  html: "boolean",
  offset: "(array|string|function)",
  placement: "(string|function)",
  popperConfig: "(null|object|function)",
  sanitize: "boolean",
  sanitizeFn: "(null|function)",
  selector: "(string|boolean)",
  template: "string",
  title: "(string|element|function)",
  trigger: "string"
};
class dt extends re {
  constructor(e, n) {
    if (typeof ro > "u")
      throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(e, n), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
  }
  // Getters
  static get Default() {
    return Bu;
  }
  static get DefaultType() {
    return Ru;
  }
  static get NAME() {
    return vu;
  }
  // Public
  enable() {
    this._isEnabled = !0;
  }
  disable() {
    this._isEnabled = !1;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (this._isEnabled) {
      if (this._activeTrigger.click = !this._activeTrigger.click, this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
  }
  dispose() {
    clearTimeout(this._timeout), u.off(this._element.closest(mi), gi, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
  }
  show() {
    if (this._element.style.display === "none")
      throw new Error("Please use show on visible elements");
    if (!(this._isWithContent() && this._isEnabled))
      return;
    const e = u.trigger(this._element, this.constructor.eventName($u)), s = (co(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (e.defaultPrevented || !s)
      return;
    this._disposePopper();
    const i = this._getTipElement();
    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
    const {
      container: o
    } = this._config;
    if (this._element.ownerDocument.documentElement.contains(this.tip) || (o.append(i), u.trigger(this._element, this.constructor.eventName(Lu))), this._popper = this._createPopper(i), i.classList.add(Ft), "ontouchstart" in document.documentElement)
      for (const a of [].concat(...document.body.children))
        u.on(a, "mouseover", Qt);
    const r = () => {
      u.trigger(this._element, this.constructor.eventName(xu)), this._isHovered === !1 && this._leave(), this._isHovered = !1;
    };
    this._queueCallback(r, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || u.trigger(this._element, this.constructor.eventName(Ou)).defaultPrevented)
      return;
    if (this._getTipElement().classList.remove(Ft), "ontouchstart" in document.documentElement)
      for (const i of [].concat(...document.body.children))
        u.off(i, "mouseover", Qt);
    this._activeTrigger[Tu] = !1, this._activeTrigger[Bn] = !1, this._activeTrigger[_t] = !1, this._isHovered = null;
    const s = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), u.trigger(this._element, this.constructor.eventName(Su)));
    };
    this._queueCallback(s, this.tip, this._isAnimated());
  }
  update() {
    this._popper && this._popper.update();
  }
  // Protected
  _isWithContent() {
    return !!this._getTitle();
  }
  _getTipElement() {
    return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
  }
  _createTipElement(e) {
    const n = this._getTemplateFactory(e).toHtml();
    if (!n)
      return null;
    n.classList.remove(Mn, Ft), n.classList.add(`bs-${this.constructor.NAME}-auto`);
    const s = Ta(this.constructor.NAME).toString();
    return n.setAttribute("id", s), this._isAnimated() && n.classList.add(Mn), n;
  }
  setContent(e) {
    this._newContent = e, this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(e) {
    return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new _u({
      ...this._config,
      // the `content` var has to be after `this._config`
      // to override config.content in case of popover
      content: e,
      extraClass: this._resolvePossibleFunction(this._config.customClass)
    }), this._templateFactory;
  }
  _getContentForTemplate() {
    return {
      [Au]: this._getTitle()
    };
  }
  _getTitle() {
    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
  }
  // Private
  _initializeOnDelegatedTarget(e) {
    return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig());
  }
  _isAnimated() {
    return this._config.animation || this.tip && this.tip.classList.contains(Mn);
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(Ft);
  }
  _createPopper(e) {
    const n = W(this._config.placement, [this, e, this._element]), s = Mu[n.toUpperCase()];
    return fs(this._element, e, this._getPopperConfig(s));
  }
  _getOffset() {
    const {
      offset: e
    } = this._config;
    return typeof e == "string" ? e.split(",").map((n) => Number.parseInt(n, 10)) : typeof e == "function" ? (n) => e(n, this._element) : e;
  }
  _resolvePossibleFunction(e) {
    return W(e, [this._element]);
  }
  _getPopperConfig(e) {
    const n = {
      placement: e,
      modifiers: [{
        name: "flip",
        options: {
          fallbackPlacements: this._config.fallbackPlacements
        }
      }, {
        name: "offset",
        options: {
          offset: this._getOffset()
        }
      }, {
        name: "preventOverflow",
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: "arrow",
        options: {
          element: `.${this.constructor.NAME}-arrow`
        }
      }, {
        name: "preSetPlacement",
        enabled: !0,
        phase: "beforeMain",
        fn: (s) => {
          this._getTipElement().setAttribute("data-popper-placement", s.state.placement);
        }
      }]
    };
    return {
      ...n,
      ...W(this._config.popperConfig, [n])
    };
  }
  _setListeners() {
    const e = this._config.trigger.split(" ");
    for (const n of e)
      if (n === "click")
        u.on(this._element, this.constructor.eventName(ku), this._config.selector, (s) => {
          this._initializeOnDelegatedTarget(s).toggle();
        });
      else if (n !== Cu) {
        const s = n === _t ? this.constructor.eventName(Iu) : this.constructor.eventName(Nu), i = n === _t ? this.constructor.eventName(Pu) : this.constructor.eventName(Du);
        u.on(this._element, s, this._config.selector, (o) => {
          const r = this._initializeOnDelegatedTarget(o);
          r._activeTrigger[o.type === "focusin" ? Bn : _t] = !0, r._enter();
        }), u.on(this._element, i, this._config.selector, (o) => {
          const r = this._initializeOnDelegatedTarget(o);
          r._activeTrigger[o.type === "focusout" ? Bn : _t] = r._element.contains(o.relatedTarget), r._leave();
        });
      }
    this._hideModalHandler = () => {
      this._element && this.hide();
    }, u.on(this._element.closest(mi), gi, this._hideModalHandler);
  }
  _fixTitle() {
    const e = this._element.getAttribute("title");
    e && (!this._element.getAttribute("aria-label") && !this._element.textContent.trim() && this._element.setAttribute("aria-label", e), this._element.setAttribute("data-bs-original-title", e), this._element.removeAttribute("title"));
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = !0;
      return;
    }
    this._isHovered = !0, this._setTimeout(() => {
      this._isHovered && this.show();
    }, this._config.delay.show);
  }
  _leave() {
    this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => {
      this._isHovered || this.hide();
    }, this._config.delay.hide));
  }
  _setTimeout(e, n) {
    clearTimeout(this._timeout), this._timeout = setTimeout(e, n);
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(!0);
  }
  _getConfig(e) {
    const n = he.getDataAttributes(this._element);
    for (const s of Object.keys(n))
      Eu.has(s) && delete n[s];
    return e = {
      ...n,
      ...typeof e == "object" && e ? e : {}
    }, e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
  }
  _configAfterMerge(e) {
    return e.container = e.container === !1 ? document.body : Ee(e.container), typeof e.delay == "number" && (e.delay = {
      show: e.delay,
      hide: e.delay
    }), typeof e.title == "number" && (e.title = e.title.toString()), typeof e.content == "number" && (e.content = e.content.toString()), e;
  }
  _getDelegateConfig() {
    const e = {};
    for (const [n, s] of Object.entries(this._config))
      this.constructor.Default[n] !== s && (e[n] = s);
    return e.selector = !1, e.trigger = "manual", e;
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null);
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const n = dt.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (typeof n[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        n[e]();
      }
    });
  }
}
se(dt);
const Vu = "popover", Hu = ".popover-header", ju = ".popover-body", Wu = {
  ...dt.Default,
  content: "",
  offset: [0, 8],
  placement: "right",
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  trigger: "click"
}, Fu = {
  ...dt.DefaultType,
  content: "(null|string|element|function)"
};
class gs extends dt {
  // Getters
  static get Default() {
    return Wu;
  }
  static get DefaultType() {
    return Fu;
  }
  static get NAME() {
    return Vu;
  }
  // Overrides
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  // Private
  _getContentForTemplate() {
    return {
      [Hu]: this._getTitle(),
      [ju]: this._getContent()
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const n = gs.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (typeof n[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        n[e]();
      }
    });
  }
}
se(gs);
const zu = "scrollspy", Ku = "bs.scrollspy", ws = `.${Ku}`, Yu = ".data-api", Uu = `activate${ws}`, wi = `click${ws}`, qu = `load${ws}${Yu}`, Gu = "dropdown-item", Ye = "active", Xu = '[data-bs-spy="scroll"]', Rn = "[href]", Qu = ".nav, .list-group", bi = ".nav-link", Zu = ".nav-item", Ju = ".list-group-item", ed = `${bi}, ${Zu} > ${bi}, ${Ju}`, td = ".dropdown", nd = ".dropdown-toggle", sd = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "0px 0px -25%",
  smoothScroll: !1,
  target: null,
  threshold: [0.1, 0.5, 1]
}, id = {
  offset: "(number|null)",
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: "string",
  smoothScroll: "boolean",
  target: "element",
  threshold: "array"
};
class wn extends re {
  constructor(e, n) {
    super(e, n), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    }, this.refresh();
  }
  // Getters
  static get Default() {
    return sd;
  }
  static get DefaultType() {
    return id;
  }
  static get NAME() {
    return zu;
  }
  // Public
  refresh() {
    this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
    for (const e of this._observableSections.values())
      this._observer.observe(e);
  }
  dispose() {
    this._observer.disconnect(), super.dispose();
  }
  // Private
  _configAfterMerge(e) {
    return e.target = Ee(e.target) || document.body, e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin, typeof e.threshold == "string" && (e.threshold = e.threshold.split(",").map((n) => Number.parseFloat(n))), e;
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll && (u.off(this._config.target, wi), u.on(this._config.target, wi, Rn, (e) => {
      const n = this._observableSections.get(e.target.hash);
      if (n) {
        e.preventDefault();
        const s = this._rootElement || window, i = n.offsetTop - this._element.offsetTop;
        if (s.scrollTo) {
          s.scrollTo({
            top: i,
            behavior: "smooth"
          });
          return;
        }
        s.scrollTop = i;
      }
    }));
  }
  _getNewObserver() {
    const e = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin
    };
    return new IntersectionObserver((n) => this._observerCallback(n), e);
  }
  // The logic of selection
  _observerCallback(e) {
    const n = (r) => this._targetLinks.get(`#${r.target.id}`), s = (r) => {
      this._previousScrollData.visibleEntryTop = r.target.offsetTop, this._process(n(r));
    }, i = (this._rootElement || document.documentElement).scrollTop, o = i >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = i;
    for (const r of e) {
      if (!r.isIntersecting) {
        this._activeTarget = null, this._clearActiveClass(n(r));
        continue;
      }
      const a = r.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (o && a) {
        if (s(r), !i)
          return;
        continue;
      }
      !o && !a && s(r);
    }
  }
  _initializeTargetsAndObservables() {
    this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
    const e = h.find(Rn, this._config.target);
    for (const n of e) {
      if (!n.hash || ye(n))
        continue;
      const s = h.findOne(decodeURI(n.hash), this._element);
      ct(s) && (this._targetLinks.set(decodeURI(n.hash), n), this._observableSections.set(n.hash, s));
    }
  }
  _process(e) {
    this._activeTarget !== e && (this._clearActiveClass(this._config.target), this._activeTarget = e, e.classList.add(Ye), this._activateParents(e), u.trigger(this._element, Uu, {
      relatedTarget: e
    }));
  }
  _activateParents(e) {
    if (e.classList.contains(Gu)) {
      h.findOne(nd, e.closest(td)).classList.add(Ye);
      return;
    }
    for (const n of h.parents(e, Qu))
      for (const s of h.prev(n, ed))
        s.classList.add(Ye);
  }
  _clearActiveClass(e) {
    e.classList.remove(Ye);
    const n = h.find(`${Rn}.${Ye}`, e);
    for (const s of n)
      s.classList.remove(Ye);
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const n = wn.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (n[e] === void 0 || e.startsWith("_") || e === "constructor")
          throw new TypeError(`No method named "${e}"`);
        n[e]();
      }
    });
  }
}
u.on(window, qu, () => {
  for (const t of h.find(Xu))
    wn.getOrCreateInstance(t);
});
se(wn);
const od = "tab", rd = "bs.tab", je = `.${rd}`, ad = `hide${je}`, ld = `hidden${je}`, cd = `show${je}`, ud = `shown${je}`, dd = `click${je}`, fd = `keydown${je}`, hd = `load${je}`, pd = "ArrowLeft", _i = "ArrowRight", md = "ArrowUp", vi = "ArrowDown", Vn = "Home", Ei = "End", Ie = "active", yi = "fade", Hn = "show", gd = "dropdown", Po = ".dropdown-toggle", wd = ".dropdown-menu", jn = `:not(${Po})`, bd = '.list-group, .nav, [role="tablist"]', _d = ".nav-item, .list-group-item", vd = `.nav-link${jn}, .list-group-item${jn}, [role="tab"]${jn}`, Mo = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', Wn = `${vd}, ${Mo}`, Ed = `.${Ie}[data-bs-toggle="tab"], .${Ie}[data-bs-toggle="pill"], .${Ie}[data-bs-toggle="list"]`;
class ot extends re {
  constructor(e) {
    super(e), this._parent = this._element.closest(bd), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), u.on(this._element, fd, (n) => this._keydown(n)));
  }
  // Getters
  static get NAME() {
    return od;
  }
  // Public
  show() {
    const e = this._element;
    if (this._elemIsActive(e))
      return;
    const n = this._getActiveElem(), s = n ? u.trigger(n, ad, {
      relatedTarget: e
    }) : null;
    u.trigger(e, cd, {
      relatedTarget: n
    }).defaultPrevented || s && s.defaultPrevented || (this._deactivate(n, e), this._activate(e, n));
  }
  // Private
  _activate(e, n) {
    if (!e)
      return;
    e.classList.add(Ie), this._activate(h.getElementFromSelector(e));
    const s = () => {
      if (e.getAttribute("role") !== "tab") {
        e.classList.add(Hn);
        return;
      }
      e.removeAttribute("tabindex"), e.setAttribute("aria-selected", !0), this._toggleDropDown(e, !0), u.trigger(e, ud, {
        relatedTarget: n
      });
    };
    this._queueCallback(s, e, e.classList.contains(yi));
  }
  _deactivate(e, n) {
    if (!e)
      return;
    e.classList.remove(Ie), e.blur(), this._deactivate(h.getElementFromSelector(e));
    const s = () => {
      if (e.getAttribute("role") !== "tab") {
        e.classList.remove(Hn);
        return;
      }
      e.setAttribute("aria-selected", !1), e.setAttribute("tabindex", "-1"), this._toggleDropDown(e, !1), u.trigger(e, ld, {
        relatedTarget: n
      });
    };
    this._queueCallback(s, e, e.classList.contains(yi));
  }
  _keydown(e) {
    if (![pd, _i, md, vi, Vn, Ei].includes(e.key))
      return;
    e.stopPropagation(), e.preventDefault();
    const n = this._getChildren().filter((i) => !ye(i));
    let s;
    if ([Vn, Ei].includes(e.key))
      s = n[e.key === Vn ? 0 : n.length - 1];
    else {
      const i = [_i, vi].includes(e.key);
      s = hs(n, e.target, i, !0);
    }
    s && (s.focus({
      preventScroll: !0
    }), ot.getOrCreateInstance(s).show());
  }
  _getChildren() {
    return h.find(Wn, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((e) => this._elemIsActive(e)) || null;
  }
  _setInitialAttributes(e, n) {
    this._setAttributeIfNotExists(e, "role", "tablist");
    for (const s of n)
      this._setInitialAttributesOnChild(s);
  }
  _setInitialAttributesOnChild(e) {
    e = this._getInnerElement(e);
    const n = this._elemIsActive(e), s = this._getOuterElement(e);
    e.setAttribute("aria-selected", n), s !== e && this._setAttributeIfNotExists(s, "role", "presentation"), n || e.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(e, "role", "tab"), this._setInitialAttributesOnTargetPanel(e);
  }
  _setInitialAttributesOnTargetPanel(e) {
    const n = h.getElementFromSelector(e);
    n && (this._setAttributeIfNotExists(n, "role", "tabpanel"), e.id && this._setAttributeIfNotExists(n, "aria-labelledby", `${e.id}`));
  }
  _toggleDropDown(e, n) {
    const s = this._getOuterElement(e);
    if (!s.classList.contains(gd))
      return;
    const i = (o, r) => {
      const a = h.findOne(o, s);
      a && a.classList.toggle(r, n);
    };
    i(Po, Ie), i(wd, Hn), s.setAttribute("aria-expanded", n);
  }
  _setAttributeIfNotExists(e, n, s) {
    e.hasAttribute(n) || e.setAttribute(n, s);
  }
  _elemIsActive(e) {
    return e.classList.contains(Ie);
  }
  // Try to get the inner element (usually the .nav-link)
  _getInnerElement(e) {
    return e.matches(Wn) ? e : h.findOne(Wn, e);
  }
  // Try to get the outer element (usually the .nav-item)
  _getOuterElement(e) {
    return e.closest(_d) || e;
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const n = ot.getOrCreateInstance(this);
      if (typeof e == "string") {
        if (n[e] === void 0 || e.startsWith("_") || e === "constructor")
          throw new TypeError(`No method named "${e}"`);
        n[e]();
      }
    });
  }
}
u.on(document, dd, Mo, function(t) {
  ["A", "AREA"].includes(this.tagName) && t.preventDefault(), !ye(this) && ot.getOrCreateInstance(this).show();
});
u.on(window, hd, () => {
  for (const t of h.find(Ed))
    ot.getOrCreateInstance(t);
});
se(ot);
const yd = "toast", Ad = "bs.toast", Oe = `.${Ad}`, Td = `mouseover${Oe}`, Cd = `mouseout${Oe}`, Od = `focusin${Oe}`, Sd = `focusout${Oe}`, $d = `hide${Oe}`, xd = `hidden${Oe}`, Ld = `show${Oe}`, kd = `shown${Oe}`, Nd = "fade", Ai = "hide", zt = "show", Kt = "showing", Dd = {
  animation: "boolean",
  autohide: "boolean",
  delay: "number"
}, Id = {
  animation: !0,
  autohide: !0,
  delay: 5e3
};
class bn extends re {
  constructor(e, n) {
    super(e, n), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners();
  }
  // Getters
  static get Default() {
    return Id;
  }
  static get DefaultType() {
    return Dd;
  }
  static get NAME() {
    return yd;
  }
  // Public
  show() {
    if (u.trigger(this._element, Ld).defaultPrevented)
      return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(Nd);
    const n = () => {
      this._element.classList.remove(Kt), u.trigger(this._element, kd), this._maybeScheduleHide();
    };
    this._element.classList.remove(Ai), Tt(this._element), this._element.classList.add(zt, Kt), this._queueCallback(n, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || u.trigger(this._element, $d).defaultPrevented)
      return;
    const n = () => {
      this._element.classList.add(Ai), this._element.classList.remove(Kt, zt), u.trigger(this._element, xd);
    };
    this._element.classList.add(Kt), this._queueCallback(n, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(zt), super.dispose();
  }
  isShown() {
    return this._element.classList.contains(zt);
  }
  // Private
  _maybeScheduleHide() {
    this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay)));
  }
  _onInteraction(e, n) {
    switch (e.type) {
      case "mouseover":
      case "mouseout": {
        this._hasMouseInteraction = n;
        break;
      }
      case "focusin":
      case "focusout": {
        this._hasKeyboardInteraction = n;
        break;
      }
    }
    if (n) {
      this._clearTimeout();
      return;
    }
    const s = e.relatedTarget;
    this._element === s || this._element.contains(s) || this._maybeScheduleHide();
  }
  _setListeners() {
    u.on(this._element, Td, (e) => this._onInteraction(e, !0)), u.on(this._element, Cd, (e) => this._onInteraction(e, !1)), u.on(this._element, Od, (e) => this._onInteraction(e, !0)), u.on(this._element, Sd, (e) => this._onInteraction(e, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), this._timeout = null;
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const n = bn.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (typeof n[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        n[e](this);
      }
    });
  }
}
pn(bn);
se(bn);
/*!
* sweetalert2 v11.15.10
* Released under the MIT License.
*/
function Bo(t, e, n) {
  if (typeof t == "function" ? t === e : t.has(e)) return arguments.length < 3 ? e : n;
  throw new TypeError("Private element is not present on this object");
}
function Pd(t, e) {
  if (e.has(t)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function Ti(t, e) {
  return t.get(Bo(t, e));
}
function Md(t, e, n) {
  Pd(t, e), e.set(t, n);
}
function Bd(t, e, n) {
  return t.set(Bo(t, e), n), n;
}
const Rd = 100, p = {}, Vd = () => {
  p.previousActiveElement instanceof HTMLElement ? (p.previousActiveElement.focus(), p.previousActiveElement = null) : document.body && document.body.focus();
}, Hd = (t) => new Promise((e) => {
  if (!t)
    return e();
  const n = window.scrollX, s = window.scrollY;
  p.restoreFocusTimeout = setTimeout(() => {
    Vd(), e();
  }, Rd), window.scrollTo(n, s);
}), Ro = "swal2-", jd = ["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "no-transition", "toast", "toast-shown", "show", "hide", "close", "title", "html-container", "actions", "confirm", "deny", "cancel", "default-outline", "footer", "icon", "icon-content", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "input-label", "validation-message", "progress-steps", "active-progress-step", "progress-step", "progress-step-line", "loader", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen", "rtl", "timer-progress-bar", "timer-progress-bar-container", "scrollbar-measure", "icon-success", "icon-warning", "icon-info", "icon-question", "icon-error", "draggable", "dragging"], l = jd.reduce(
  (t, e) => (t[e] = Ro + e, t),
  /** @type {SwalClasses} */
  {}
), Wd = ["success", "warning", "info", "question", "error"], en = Wd.reduce(
  (t, e) => (t[e] = Ro + e, t),
  /** @type {SwalIcons} */
  {}
), Vo = "SweetAlert2:", bs = (t) => t.charAt(0).toUpperCase() + t.slice(1), z = (t) => {
  console.warn(`${Vo} ${typeof t == "object" ? t.join(" ") : t}`);
}, We = (t) => {
  console.error(`${Vo} ${t}`);
}, Ci = [], Fd = (t) => {
  Ci.includes(t) || (Ci.push(t), z(t));
}, Ho = function(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  Fd(`"${t}" is deprecated and will be removed in the next major release.${e ? ` Use "${e}" instead.` : ""}`);
}, _n = (t) => typeof t == "function" ? t() : t, _s = (t) => t && typeof t.toPromise == "function", $t = (t) => _s(t) ? t.toPromise() : Promise.resolve(t), vs = (t) => t && Promise.resolve(t) === t, K = () => document.body.querySelector(`.${l.container}`), xt = (t) => {
  const e = K();
  return e ? e.querySelector(t) : null;
}, Q = (t) => xt(`.${t}`), y = () => Q(l.popup), ft = () => Q(l.icon), zd = () => Q(l["icon-content"]), jo = () => Q(l.title), Es = () => Q(l["html-container"]), Wo = () => Q(l.image), ys = () => Q(l["progress-steps"]), vn = () => Q(l["validation-message"]), de = () => (
  /** @type {HTMLButtonElement} */
  xt(`.${l.actions} .${l.confirm}`)
), ht = () => (
  /** @type {HTMLButtonElement} */
  xt(`.${l.actions} .${l.cancel}`)
), Fe = () => (
  /** @type {HTMLButtonElement} */
  xt(`.${l.actions} .${l.deny}`)
), Kd = () => Q(l["input-label"]), pt = () => xt(`.${l.loader}`), Lt = () => Q(l.actions), Fo = () => Q(l.footer), En = () => Q(l["timer-progress-bar"]), As = () => Q(l.close), Yd = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls],
  summary
`, Ts = () => {
  const t = y();
  if (!t)
    return [];
  const e = t.querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'), n = Array.from(e).sort((o, r) => {
    const a = parseInt(o.getAttribute("tabindex") || "0"), c = parseInt(r.getAttribute("tabindex") || "0");
    return a > c ? 1 : a < c ? -1 : 0;
  }), s = t.querySelectorAll(Yd), i = Array.from(s).filter((o) => o.getAttribute("tabindex") !== "-1");
  return [...new Set(n.concat(i))].filter((o) => F(o));
}, Cs = () => pe(document.body, l.shown) && !pe(document.body, l["toast-shown"]) && !pe(document.body, l["no-backdrop"]), yn = () => {
  const t = y();
  return t ? pe(t, l.toast) : !1;
}, Ud = () => {
  const t = y();
  return t ? t.hasAttribute("data-loading") : !1;
}, Z = (t, e) => {
  if (t.textContent = "", e) {
    const s = new DOMParser().parseFromString(e, "text/html"), i = s.querySelector("head");
    i && Array.from(i.childNodes).forEach((r) => {
      t.appendChild(r);
    });
    const o = s.querySelector("body");
    o && Array.from(o.childNodes).forEach((r) => {
      r instanceof HTMLVideoElement || r instanceof HTMLAudioElement ? t.appendChild(r.cloneNode(!0)) : t.appendChild(r);
    });
  }
}, pe = (t, e) => {
  if (!e)
    return !1;
  const n = e.split(/\s+/);
  for (let s = 0; s < n.length; s++)
    if (!t.classList.contains(n[s]))
      return !1;
  return !0;
}, qd = (t, e) => {
  Array.from(t.classList).forEach((n) => {
    !Object.values(l).includes(n) && !Object.values(en).includes(n) && !Object.values(e.showClass || {}).includes(n) && t.classList.remove(n);
  });
}, X = (t, e, n) => {
  if (qd(t, e), !e.customClass)
    return;
  const s = e.customClass[
    /** @type {keyof SweetAlertCustomClass} */
    n
  ];
  if (s) {
    if (typeof s != "string" && !s.forEach) {
      z(`Invalid type of customClass.${n}! Expected string or iterable object, got "${typeof s}"`);
      return;
    }
    v(t, s);
  }
}, An = (t, e) => {
  if (!e)
    return null;
  switch (e) {
    case "select":
    case "textarea":
    case "file":
      return t.querySelector(`.${l.popup} > .${l[e]}`);
    case "checkbox":
      return t.querySelector(`.${l.popup} > .${l.checkbox} input`);
    case "radio":
      return t.querySelector(`.${l.popup} > .${l.radio} input:checked`) || t.querySelector(`.${l.popup} > .${l.radio} input:first-child`);
    case "range":
      return t.querySelector(`.${l.popup} > .${l.range} input`);
    default:
      return t.querySelector(`.${l.popup} > .${l.input}`);
  }
}, zo = (t) => {
  if (t.focus(), t.type !== "file") {
    const e = t.value;
    t.value = "", t.value = e;
  }
}, Ko = (t, e, n) => {
  !t || !e || (typeof e == "string" && (e = e.split(/\s+/).filter(Boolean)), e.forEach((s) => {
    Array.isArray(t) ? t.forEach((i) => {
      n ? i.classList.add(s) : i.classList.remove(s);
    }) : n ? t.classList.add(s) : t.classList.remove(s);
  }));
}, v = (t, e) => {
  Ko(t, e, !0);
}, ne = (t, e) => {
  Ko(t, e, !1);
}, _e = (t, e) => {
  const n = Array.from(t.children);
  for (let s = 0; s < n.length; s++) {
    const i = n[s];
    if (i instanceof HTMLElement && pe(i, e))
      return i;
  }
}, Me = (t, e, n) => {
  n === `${parseInt(n)}` && (n = parseInt(n)), n || parseInt(n) === 0 ? t.style.setProperty(e, typeof n == "number" ? `${n}px` : n) : t.style.removeProperty(e);
}, P = function(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "flex";
  t && (t.style.display = e);
}, R = (t) => {
  t && (t.style.display = "none");
}, Os = function(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "block";
  t && new MutationObserver(() => {
    kt(t, t.innerHTML, e);
  }).observe(t, {
    childList: !0,
    subtree: !0
  });
}, Oi = (t, e, n, s) => {
  const i = t.querySelector(e);
  i && i.style.setProperty(n, s);
}, kt = function(t, e) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "flex";
  e ? P(t, n) : R(t);
}, F = (t) => !!(t && (t.offsetWidth || t.offsetHeight || t.getClientRects().length)), Gd = () => !F(de()) && !F(Fe()) && !F(ht()), Si = (t) => t.scrollHeight > t.clientHeight, Yo = (t) => {
  const e = window.getComputedStyle(t), n = parseFloat(e.getPropertyValue("animation-duration") || "0"), s = parseFloat(e.getPropertyValue("transition-duration") || "0");
  return n > 0 || s > 0;
}, Ss = function(t) {
  let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  const n = En();
  n && F(n) && (e && (n.style.transition = "none", n.style.width = "100%"), setTimeout(() => {
    n.style.transition = `width ${t / 1e3}s linear`, n.style.width = "0%";
  }, 10));
}, Xd = () => {
  const t = En();
  if (!t)
    return;
  const e = parseInt(window.getComputedStyle(t).width);
  t.style.removeProperty("transition"), t.style.width = "100%";
  const n = parseInt(window.getComputedStyle(t).width), s = e / n * 100;
  t.style.width = `${s}%`;
}, Qd = () => typeof window > "u" || typeof document > "u", Zd = `
 <div aria-labelledby="${l.title}" aria-describedby="${l["html-container"]}" class="${l.popup}" tabindex="-1">
   <button type="button" class="${l.close}"></button>
   <ul class="${l["progress-steps"]}"></ul>
   <div class="${l.icon}"></div>
   <img class="${l.image}" />
   <h2 class="${l.title}" id="${l.title}"></h2>
   <div class="${l["html-container"]}" id="${l["html-container"]}"></div>
   <input class="${l.input}" id="${l.input}" />
   <input type="file" class="${l.file}" />
   <div class="${l.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${l.select}" id="${l.select}"></select>
   <div class="${l.radio}"></div>
   <label class="${l.checkbox}">
     <input type="checkbox" id="${l.checkbox}" />
     <span class="${l.label}"></span>
   </label>
   <textarea class="${l.textarea}" id="${l.textarea}"></textarea>
   <div class="${l["validation-message"]}" id="${l["validation-message"]}"></div>
   <div class="${l.actions}">
     <div class="${l.loader}"></div>
     <button type="button" class="${l.confirm}"></button>
     <button type="button" class="${l.deny}"></button>
     <button type="button" class="${l.cancel}"></button>
   </div>
   <div class="${l.footer}"></div>
   <div class="${l["timer-progress-bar-container"]}">
     <div class="${l["timer-progress-bar"]}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g, ""), Jd = () => {
  const t = K();
  return t ? (t.remove(), ne([document.documentElement, document.body], [l["no-backdrop"], l["toast-shown"], l["has-column"]]), !0) : !1;
}, Ne = () => {
  p.currentInstance.resetValidationMessage();
}, ef = () => {
  const t = y(), e = _e(t, l.input), n = _e(t, l.file), s = t.querySelector(`.${l.range} input`), i = t.querySelector(`.${l.range} output`), o = _e(t, l.select), r = t.querySelector(`.${l.checkbox} input`), a = _e(t, l.textarea);
  e.oninput = Ne, n.onchange = Ne, o.onchange = Ne, r.onchange = Ne, a.oninput = Ne, s.oninput = () => {
    Ne(), i.value = s.value;
  }, s.onchange = () => {
    Ne(), i.value = s.value;
  };
}, tf = (t) => typeof t == "string" ? document.querySelector(t) : t, nf = (t) => {
  const e = y();
  e.setAttribute("role", t.toast ? "alert" : "dialog"), e.setAttribute("aria-live", t.toast ? "polite" : "assertive"), t.toast || e.setAttribute("aria-modal", "true");
}, sf = (t) => {
  window.getComputedStyle(t).direction === "rtl" && v(K(), l.rtl);
}, of = (t) => {
  const e = Jd();
  if (Qd()) {
    We("SweetAlert2 requires document to initialize");
    return;
  }
  const n = document.createElement("div");
  n.className = l.container, e && v(n, l["no-transition"]), Z(n, Zd);
  const s = tf(t.target);
  s.appendChild(n), nf(t), sf(s), ef();
}, $s = (t, e) => {
  t instanceof HTMLElement ? e.appendChild(t) : typeof t == "object" ? rf(t, e) : t && Z(e, t);
}, rf = (t, e) => {
  t.jquery ? af(e, t) : Z(e, t.toString());
}, af = (t, e) => {
  if (t.textContent = "", 0 in e)
    for (let n = 0; n in e; n++)
      t.appendChild(e[n].cloneNode(!0));
  else
    t.appendChild(e.cloneNode(!0));
}, lf = (t, e) => {
  const n = Lt(), s = pt();
  !n || !s || (!e.showConfirmButton && !e.showDenyButton && !e.showCancelButton ? R(n) : P(n), X(n, e, "actions"), cf(n, s, e), Z(s, e.loaderHtml || ""), X(s, e, "loader"));
};
function cf(t, e, n) {
  const s = de(), i = Fe(), o = ht();
  !s || !i || !o || (Fn(s, "confirm", n), Fn(i, "deny", n), Fn(o, "cancel", n), uf(s, i, o, n), n.reverseButtons && (n.toast ? (t.insertBefore(o, s), t.insertBefore(i, s)) : (t.insertBefore(o, e), t.insertBefore(i, e), t.insertBefore(s, e))));
}
function uf(t, e, n, s) {
  if (!s.buttonsStyling) {
    ne([t, e, n], l.styled);
    return;
  }
  v([t, e, n], l.styled), s.confirmButtonColor && (t.style.backgroundColor = s.confirmButtonColor, v(t, l["default-outline"])), s.denyButtonColor && (e.style.backgroundColor = s.denyButtonColor, v(e, l["default-outline"])), s.cancelButtonColor && (n.style.backgroundColor = s.cancelButtonColor, v(n, l["default-outline"]));
}
function Fn(t, e, n) {
  const s = (
    /** @type {'Confirm' | 'Deny' | 'Cancel'} */
    bs(e)
  );
  kt(t, n[`show${s}Button`], "inline-block"), Z(t, n[`${e}ButtonText`] || ""), t.setAttribute("aria-label", n[`${e}ButtonAriaLabel`] || ""), t.className = l[e], X(t, n, `${e}Button`);
}
const df = (t, e) => {
  const n = As();
  n && (Z(n, e.closeButtonHtml || ""), X(n, e, "closeButton"), kt(n, e.showCloseButton), n.setAttribute("aria-label", e.closeButtonAriaLabel || ""));
}, ff = (t, e) => {
  const n = K();
  n && (hf(n, e.backdrop), pf(n, e.position), mf(n, e.grow), X(n, e, "container"));
};
function hf(t, e) {
  typeof e == "string" ? t.style.background = e : e || v([document.documentElement, document.body], l["no-backdrop"]);
}
function pf(t, e) {
  e && (e in l ? v(t, l[e]) : (z('The "position" parameter is not valid, defaulting to "center"'), v(t, l.center)));
}
function mf(t, e) {
  e && v(t, l[`grow-${e}`]);
}
var O = {
  innerParams: /* @__PURE__ */ new WeakMap(),
  domCache: /* @__PURE__ */ new WeakMap()
};
const gf = ["input", "file", "range", "select", "radio", "checkbox", "textarea"], wf = (t, e) => {
  const n = y();
  if (!n)
    return;
  const s = O.innerParams.get(t), i = !s || e.input !== s.input;
  gf.forEach((o) => {
    const r = _e(n, l[o]);
    r && (vf(o, e.inputAttributes), r.className = l[o], i && R(r));
  }), e.input && (i && bf(e), Ef(e));
}, bf = (t) => {
  if (!t.input)
    return;
  if (!k[t.input]) {
    We(`Unexpected type of input! Expected ${Object.keys(k).join(" | ")}, got "${t.input}"`);
    return;
  }
  const e = Uo(t.input);
  if (!e)
    return;
  const n = k[t.input](e, t);
  P(e), t.inputAutoFocus && setTimeout(() => {
    zo(n);
  });
}, _f = (t) => {
  for (let e = 0; e < t.attributes.length; e++) {
    const n = t.attributes[e].name;
    ["id", "type", "value", "style"].includes(n) || t.removeAttribute(n);
  }
}, vf = (t, e) => {
  const n = y();
  if (!n)
    return;
  const s = An(n, t);
  if (s) {
    _f(s);
    for (const i in e)
      s.setAttribute(i, e[i]);
  }
}, Ef = (t) => {
  if (!t.input)
    return;
  const e = Uo(t.input);
  e && X(e, t, "input");
}, xs = (t, e) => {
  !t.placeholder && e.inputPlaceholder && (t.placeholder = e.inputPlaceholder);
}, Nt = (t, e, n) => {
  if (n.inputLabel) {
    const s = document.createElement("label"), i = l["input-label"];
    s.setAttribute("for", t.id), s.className = i, typeof n.customClass == "object" && v(s, n.customClass.inputLabel), s.innerText = n.inputLabel, e.insertAdjacentElement("beforebegin", s);
  }
}, Uo = (t) => {
  const e = y();
  if (e)
    return _e(e, l[
      /** @type {SwalClass} */
      t
    ] || l.input);
}, tn = (t, e) => {
  ["string", "number"].includes(typeof e) ? t.value = `${e}` : vs(e) || z(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof e}"`);
}, k = {};
k.text = k.email = k.password = k.number = k.tel = k.url = k.search = k.date = k["datetime-local"] = k.time = k.week = k.month = /** @type {(input: Input | HTMLElement, params: SweetAlertOptions) => Input} */
(t, e) => (tn(t, e.inputValue), Nt(t, t, e), xs(t, e), t.type = e.input, t);
k.file = (t, e) => (Nt(t, t, e), xs(t, e), t);
k.range = (t, e) => {
  const n = t.querySelector("input"), s = t.querySelector("output");
  return tn(n, e.inputValue), n.type = e.input, tn(s, e.inputValue), Nt(n, t, e), t;
};
k.select = (t, e) => {
  if (t.textContent = "", e.inputPlaceholder) {
    const n = document.createElement("option");
    Z(n, e.inputPlaceholder), n.value = "", n.disabled = !0, n.selected = !0, t.appendChild(n);
  }
  return Nt(t, t, e), t;
};
k.radio = (t) => (t.textContent = "", t);
k.checkbox = (t, e) => {
  const n = An(y(), "checkbox");
  n.value = "1", n.checked = !!e.inputValue;
  const s = t.querySelector("span");
  return Z(s, e.inputPlaceholder || e.inputLabel), n;
};
k.textarea = (t, e) => {
  tn(t, e.inputValue), xs(t, e), Nt(t, t, e);
  const n = (s) => parseInt(window.getComputedStyle(s).marginLeft) + parseInt(window.getComputedStyle(s).marginRight);
  return setTimeout(() => {
    if ("MutationObserver" in window) {
      const s = parseInt(window.getComputedStyle(y()).width), i = () => {
        if (!document.body.contains(t))
          return;
        const o = t.offsetWidth + n(t);
        o > s ? y().style.width = `${o}px` : Me(y(), "width", e.width);
      };
      new MutationObserver(i).observe(t, {
        attributes: !0,
        attributeFilter: ["style"]
      });
    }
  }), t;
};
const yf = (t, e) => {
  const n = Es();
  n && (Os(n), X(n, e, "htmlContainer"), e.html ? ($s(e.html, n), P(n, "block")) : e.text ? (n.textContent = e.text, P(n, "block")) : R(n), wf(t, e));
}, Af = (t, e) => {
  const n = Fo();
  n && (Os(n), kt(n, e.footer, "block"), e.footer && $s(e.footer, n), X(n, e, "footer"));
}, Tf = (t, e) => {
  const n = O.innerParams.get(t), s = ft();
  if (s) {
    if (n && e.icon === n.icon) {
      xi(s, e), $i(s, e);
      return;
    }
    if (!e.icon && !e.iconHtml) {
      R(s);
      return;
    }
    if (e.icon && Object.keys(en).indexOf(e.icon) === -1) {
      We(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${e.icon}"`), R(s);
      return;
    }
    P(s), xi(s, e), $i(s, e), v(s, e.showClass && e.showClass.icon);
  }
}, $i = (t, e) => {
  for (const [n, s] of Object.entries(en))
    e.icon !== n && ne(t, s);
  v(t, e.icon && en[e.icon]), $f(t, e), Cf(), X(t, e, "icon");
}, Cf = () => {
  const t = y();
  if (!t)
    return;
  const e = window.getComputedStyle(t).getPropertyValue("background-color"), n = t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");
  for (let s = 0; s < n.length; s++)
    n[s].style.backgroundColor = e;
}, Of = `
  <div class="swal2-success-circular-line-left"></div>
  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>
  <div class="swal2-success-circular-line-right"></div>
`, Sf = `
  <span class="swal2-x-mark">
    <span class="swal2-x-mark-line-left"></span>
    <span class="swal2-x-mark-line-right"></span>
  </span>
`, xi = (t, e) => {
  if (!e.icon && !e.iconHtml)
    return;
  let n = t.innerHTML, s = "";
  e.iconHtml ? s = Li(e.iconHtml) : e.icon === "success" ? (s = Of, n = n.replace(/ style=".*?"/g, "")) : e.icon === "error" ? s = Sf : e.icon && (s = Li({
    question: "?",
    warning: "!",
    info: "i"
  }[e.icon])), n.trim() !== s.trim() && Z(t, s);
}, $f = (t, e) => {
  if (e.iconColor) {
    t.style.color = e.iconColor, t.style.borderColor = e.iconColor;
    for (const n of [".swal2-success-line-tip", ".swal2-success-line-long", ".swal2-x-mark-line-left", ".swal2-x-mark-line-right"])
      Oi(t, n, "background-color", e.iconColor);
    Oi(t, ".swal2-success-ring", "border-color", e.iconColor);
  }
}, Li = (t) => `<div class="${l["icon-content"]}">${t}</div>`, xf = (t, e) => {
  const n = Wo();
  if (n) {
    if (!e.imageUrl) {
      R(n);
      return;
    }
    P(n, ""), n.setAttribute("src", e.imageUrl), n.setAttribute("alt", e.imageAlt || ""), Me(n, "width", e.imageWidth), Me(n, "height", e.imageHeight), n.className = l.image, X(n, e, "image");
  }
};
let Ls = !1, qo = 0, Go = 0, Xo = 0, Qo = 0;
const Lf = (t) => {
  t.addEventListener("mousedown", nn), document.body.addEventListener("mousemove", sn), t.addEventListener("mouseup", on), t.addEventListener("touchstart", nn), document.body.addEventListener("touchmove", sn), t.addEventListener("touchend", on);
}, kf = (t) => {
  t.removeEventListener("mousedown", nn), document.body.removeEventListener("mousemove", sn), t.removeEventListener("mouseup", on), t.removeEventListener("touchstart", nn), document.body.removeEventListener("touchmove", sn), t.removeEventListener("touchend", on);
}, nn = (t) => {
  const e = y();
  if (t.target === e || ft().contains(
    /** @type {HTMLElement} */
    t.target
  )) {
    Ls = !0;
    const n = Zo(t);
    qo = n.clientX, Go = n.clientY, Xo = parseInt(e.style.insetInlineStart) || 0, Qo = parseInt(e.style.insetBlockStart) || 0, v(e, "swal2-dragging");
  }
}, sn = (t) => {
  const e = y();
  if (Ls) {
    let {
      clientX: n,
      clientY: s
    } = Zo(t);
    e.style.insetInlineStart = `${Xo + (n - qo)}px`, e.style.insetBlockStart = `${Qo + (s - Go)}px`;
  }
}, on = () => {
  const t = y();
  Ls = !1, ne(t, "swal2-dragging");
}, Zo = (t) => {
  let e = 0, n = 0;
  return t.type.startsWith("mouse") ? (e = /** @type {MouseEvent} */
  t.clientX, n = /** @type {MouseEvent} */
  t.clientY) : t.type.startsWith("touch") && (e = /** @type {TouchEvent} */
  t.touches[0].clientX, n = /** @type {TouchEvent} */
  t.touches[0].clientY), {
    clientX: e,
    clientY: n
  };
}, Nf = (t, e) => {
  const n = K(), s = y();
  if (!(!n || !s)) {
    if (e.toast) {
      Me(n, "width", e.width), s.style.width = "100%";
      const i = pt();
      i && s.insertBefore(i, ft());
    } else
      Me(s, "width", e.width);
    Me(s, "padding", e.padding), e.color && (s.style.color = e.color), e.background && (s.style.background = e.background), R(vn()), Df(s, e), e.draggable && !e.toast ? (v(s, l.draggable), Lf(s)) : (ne(s, l.draggable), kf(s));
  }
}, Df = (t, e) => {
  const n = e.showClass || {};
  t.className = `${l.popup} ${F(t) ? n.popup : ""}`, e.toast ? (v([document.documentElement, document.body], l["toast-shown"]), v(t, l.toast)) : v(t, l.modal), X(t, e, "popup"), typeof e.customClass == "string" && v(t, e.customClass), e.icon && v(t, l[`icon-${e.icon}`]);
}, If = (t, e) => {
  const n = ys();
  if (!n)
    return;
  const {
    progressSteps: s,
    currentProgressStep: i
  } = e;
  if (!s || s.length === 0 || i === void 0) {
    R(n);
    return;
  }
  P(n), n.textContent = "", i >= s.length && z("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"), s.forEach((o, r) => {
    const a = Pf(o);
    if (n.appendChild(a), r === i && v(a, l["active-progress-step"]), r !== s.length - 1) {
      const c = Mf(e);
      n.appendChild(c);
    }
  });
}, Pf = (t) => {
  const e = document.createElement("li");
  return v(e, l["progress-step"]), Z(e, t), e;
}, Mf = (t) => {
  const e = document.createElement("li");
  return v(e, l["progress-step-line"]), t.progressStepsDistance && Me(e, "width", t.progressStepsDistance), e;
}, Bf = (t, e) => {
  const n = jo();
  n && (Os(n), kt(n, e.title || e.titleText, "block"), e.title && $s(e.title, n), e.titleText && (n.innerText = e.titleText), X(n, e, "title"));
}, Jo = (t, e) => {
  Nf(t, e), ff(t, e), If(t, e), Tf(t, e), xf(t, e), Bf(t, e), df(t, e), yf(t, e), lf(t, e), Af(t, e);
  const n = y();
  typeof e.didRender == "function" && n && e.didRender(n), p.eventEmitter.emit("didRender", n);
}, Rf = () => F(y()), er = () => {
  var t;
  return (t = de()) === null || t === void 0 ? void 0 : t.click();
}, Vf = () => {
  var t;
  return (t = Fe()) === null || t === void 0 ? void 0 : t.click();
}, Hf = () => {
  var t;
  return (t = ht()) === null || t === void 0 ? void 0 : t.click();
}, mt = Object.freeze({
  cancel: "cancel",
  backdrop: "backdrop",
  close: "close",
  esc: "esc",
  timer: "timer"
}), tr = (t) => {
  t.keydownTarget && t.keydownHandlerAdded && (t.keydownTarget.removeEventListener("keydown", t.keydownHandler, {
    capture: t.keydownListenerCapture
  }), t.keydownHandlerAdded = !1);
}, jf = (t, e, n) => {
  tr(t), e.toast || (t.keydownHandler = (s) => Ff(e, s, n), t.keydownTarget = e.keydownListenerCapture ? window : y(), t.keydownListenerCapture = e.keydownListenerCapture, t.keydownTarget.addEventListener("keydown", t.keydownHandler, {
    capture: t.keydownListenerCapture
  }), t.keydownHandlerAdded = !0);
}, Zn = (t, e) => {
  var n;
  const s = Ts();
  if (s.length) {
    t = t + e, t === s.length ? t = 0 : t === -1 && (t = s.length - 1), s[t].focus();
    return;
  }
  (n = y()) === null || n === void 0 || n.focus();
}, nr = ["ArrowRight", "ArrowDown"], Wf = ["ArrowLeft", "ArrowUp"], Ff = (t, e, n) => {
  t && (e.isComposing || e.keyCode === 229 || (t.stopKeydownPropagation && e.stopPropagation(), e.key === "Enter" ? zf(e, t) : e.key === "Tab" ? Kf(e) : [...nr, ...Wf].includes(e.key) ? Yf(e.key) : e.key === "Escape" && Uf(e, t, n)));
}, zf = (t, e) => {
  if (!_n(e.allowEnterKey))
    return;
  const n = An(y(), e.input);
  if (t.target && n && t.target instanceof HTMLElement && t.target.outerHTML === n.outerHTML) {
    if (["textarea", "file"].includes(e.input))
      return;
    er(), t.preventDefault();
  }
}, Kf = (t) => {
  const e = t.target, n = Ts();
  let s = -1;
  for (let i = 0; i < n.length; i++)
    if (e === n[i]) {
      s = i;
      break;
    }
  t.shiftKey ? Zn(s, -1) : Zn(s, 1), t.stopPropagation(), t.preventDefault();
}, Yf = (t) => {
  const e = Lt(), n = de(), s = Fe(), i = ht();
  if (!e || !n || !s || !i)
    return;
  const o = [n, s, i];
  if (document.activeElement instanceof HTMLElement && !o.includes(document.activeElement))
    return;
  const r = nr.includes(t) ? "nextElementSibling" : "previousElementSibling";
  let a = document.activeElement;
  if (a) {
    for (let c = 0; c < e.children.length; c++) {
      if (a = a[r], !a)
        return;
      if (a instanceof HTMLButtonElement && F(a))
        break;
    }
    a instanceof HTMLButtonElement && a.focus();
  }
}, Uf = (t, e, n) => {
  _n(e.allowEscapeKey) && (t.preventDefault(), n(mt.esc));
};
var rt = {
  swalPromiseResolve: /* @__PURE__ */ new WeakMap(),
  swalPromiseReject: /* @__PURE__ */ new WeakMap()
};
const qf = () => {
  const t = K();
  Array.from(document.body.children).forEach((n) => {
    n.contains(t) || (n.hasAttribute("aria-hidden") && n.setAttribute("data-previous-aria-hidden", n.getAttribute("aria-hidden") || ""), n.setAttribute("aria-hidden", "true"));
  });
}, sr = () => {
  Array.from(document.body.children).forEach((e) => {
    e.hasAttribute("data-previous-aria-hidden") ? (e.setAttribute("aria-hidden", e.getAttribute("data-previous-aria-hidden") || ""), e.removeAttribute("data-previous-aria-hidden")) : e.removeAttribute("aria-hidden");
  });
}, ir = typeof window < "u" && !!window.GestureEvent, Gf = () => {
  if (ir && !pe(document.body, l.iosfix)) {
    const t = document.body.scrollTop;
    document.body.style.top = `${t * -1}px`, v(document.body, l.iosfix), Xf();
  }
}, Xf = () => {
  const t = K();
  if (!t)
    return;
  let e;
  t.ontouchstart = (n) => {
    e = Qf(n);
  }, t.ontouchmove = (n) => {
    e && (n.preventDefault(), n.stopPropagation());
  };
}, Qf = (t) => {
  const e = t.target, n = K(), s = Es();
  return !n || !s || Zf(t) || Jf(t) ? !1 : e === n || !Si(n) && e instanceof HTMLElement && e.tagName !== "INPUT" && // #1603
  e.tagName !== "TEXTAREA" && // #2266
  !(Si(s) && // #1944
  s.contains(e));
}, Zf = (t) => t.touches && t.touches.length && t.touches[0].touchType === "stylus", Jf = (t) => t.touches && t.touches.length > 1, eh = () => {
  if (pe(document.body, l.iosfix)) {
    const t = parseInt(document.body.style.top, 10);
    ne(document.body, l.iosfix), document.body.style.top = "", document.body.scrollTop = t * -1;
  }
}, th = () => {
  const t = document.createElement("div");
  t.className = l["scrollbar-measure"], document.body.appendChild(t);
  const e = t.getBoundingClientRect().width - t.clientWidth;
  return document.body.removeChild(t), e;
};
let Qe = null;
const nh = (t) => {
  Qe === null && (document.body.scrollHeight > window.innerHeight || t === "scroll") && (Qe = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")), document.body.style.paddingRight = `${Qe + th()}px`);
}, sh = () => {
  Qe !== null && (document.body.style.paddingRight = `${Qe}px`, Qe = null);
};
function or(t, e, n, s) {
  yn() ? ki(t, s) : (Hd(n).then(() => ki(t, s)), tr(p)), ir ? (e.setAttribute("style", "display:none !important"), e.removeAttribute("class"), e.innerHTML = "") : e.remove(), Cs() && (sh(), eh(), sr()), ih();
}
function ih() {
  ne([document.documentElement, document.body], [l.shown, l["height-auto"], l["no-backdrop"], l["toast-shown"]]);
}
function ve(t) {
  t = rh(t);
  const e = rt.swalPromiseResolve.get(this), n = oh(this);
  this.isAwaitingPromise ? t.isDismissed || (Dt(this), e(t)) : n && e(t);
}
const oh = (t) => {
  const e = y();
  if (!e)
    return !1;
  const n = O.innerParams.get(t);
  if (!n || pe(e, n.hideClass.popup))
    return !1;
  ne(e, n.showClass.popup), v(e, n.hideClass.popup);
  const s = K();
  return ne(s, n.showClass.backdrop), v(s, n.hideClass.backdrop), ah(t, e, n), !0;
};
function rr(t) {
  const e = rt.swalPromiseReject.get(this);
  Dt(this), e && e(t);
}
const Dt = (t) => {
  t.isAwaitingPromise && (delete t.isAwaitingPromise, O.innerParams.get(t) || t._destroy());
}, rh = (t) => typeof t > "u" ? {
  isConfirmed: !1,
  isDenied: !1,
  isDismissed: !0
} : Object.assign({
  isConfirmed: !1,
  isDenied: !1,
  isDismissed: !1
}, t), ah = (t, e, n) => {
  var s;
  const i = K(), o = Yo(e);
  typeof n.willClose == "function" && n.willClose(e), (s = p.eventEmitter) === null || s === void 0 || s.emit("willClose", e), o ? lh(t, e, i, n.returnFocus, n.didClose) : or(t, i, n.returnFocus, n.didClose);
}, lh = (t, e, n, s, i) => {
  p.swalCloseEventFinishedCallback = or.bind(null, t, n, s, i);
  const o = function(r) {
    if (r.target === e) {
      var a;
      (a = p.swalCloseEventFinishedCallback) === null || a === void 0 || a.call(p), delete p.swalCloseEventFinishedCallback, e.removeEventListener("animationend", o), e.removeEventListener("transitionend", o);
    }
  };
  e.addEventListener("animationend", o), e.addEventListener("transitionend", o);
}, ki = (t, e) => {
  setTimeout(() => {
    var n;
    typeof e == "function" && e.bind(t.params)(), (n = p.eventEmitter) === null || n === void 0 || n.emit("didClose"), t._destroy && t._destroy();
  });
}, at = (t) => {
  let e = y();
  if (e || new un(), e = y(), !e)
    return;
  const n = pt();
  yn() ? R(ft()) : ch(e, t), P(n), e.setAttribute("data-loading", "true"), e.setAttribute("aria-busy", "true"), e.focus();
}, ch = (t, e) => {
  const n = Lt(), s = pt();
  !n || !s || (!e && F(de()) && (e = de()), P(n), e && (R(e), s.setAttribute("data-button-to-replace", e.className), n.insertBefore(s, e)), v([t, n], l.loading));
}, uh = (t, e) => {
  e.input === "select" || e.input === "radio" ? mh(t, e) : ["text", "email", "number", "tel", "textarea"].some((n) => n === e.input) && (_s(e.inputValue) || vs(e.inputValue)) && (at(de()), gh(t, e));
}, dh = (t, e) => {
  const n = t.getInput();
  if (!n)
    return null;
  switch (e.input) {
    case "checkbox":
      return fh(n);
    case "radio":
      return hh(n);
    case "file":
      return ph(n);
    default:
      return e.inputAutoTrim ? n.value.trim() : n.value;
  }
}, fh = (t) => t.checked ? 1 : 0, hh = (t) => t.checked ? t.value : null, ph = (t) => t.files && t.files.length ? t.getAttribute("multiple") !== null ? t.files : t.files[0] : null, mh = (t, e) => {
  const n = y();
  if (!n)
    return;
  const s = (i) => {
    e.input === "select" ? wh(n, rn(i), e) : e.input === "radio" && bh(n, rn(i), e);
  };
  _s(e.inputOptions) || vs(e.inputOptions) ? (at(de()), $t(e.inputOptions).then((i) => {
    t.hideLoading(), s(i);
  })) : typeof e.inputOptions == "object" ? s(e.inputOptions) : We(`Unexpected type of inputOptions! Expected object, Map or Promise, got ${typeof e.inputOptions}`);
}, gh = (t, e) => {
  const n = t.getInput();
  n && (R(n), $t(e.inputValue).then((s) => {
    n.value = e.input === "number" ? `${parseFloat(s) || 0}` : `${s}`, P(n), n.focus(), t.hideLoading();
  }).catch((s) => {
    We(`Error in inputValue promise: ${s}`), n.value = "", P(n), n.focus(), t.hideLoading();
  }));
};
function wh(t, e, n) {
  const s = _e(t, l.select);
  if (!s)
    return;
  const i = (o, r, a) => {
    const c = document.createElement("option");
    c.value = a, Z(c, r), c.selected = ar(a, n.inputValue), o.appendChild(c);
  };
  e.forEach((o) => {
    const r = o[0], a = o[1];
    if (Array.isArray(a)) {
      const c = document.createElement("optgroup");
      c.label = r, c.disabled = !1, s.appendChild(c), a.forEach((f) => i(c, f[1], f[0]));
    } else
      i(s, a, r);
  }), s.focus();
}
function bh(t, e, n) {
  const s = _e(t, l.radio);
  if (!s)
    return;
  e.forEach((o) => {
    const r = o[0], a = o[1], c = document.createElement("input"), f = document.createElement("label");
    c.type = "radio", c.name = l.radio, c.value = r, ar(r, n.inputValue) && (c.checked = !0);
    const d = document.createElement("span");
    Z(d, a), d.className = l.label, f.appendChild(c), f.appendChild(d), s.appendChild(f);
  });
  const i = s.querySelectorAll("input");
  i.length && i[0].focus();
}
const rn = (t) => {
  const e = [];
  return t instanceof Map ? t.forEach((n, s) => {
    let i = n;
    typeof i == "object" && (i = rn(i)), e.push([s, i]);
  }) : Object.keys(t).forEach((n) => {
    let s = t[n];
    typeof s == "object" && (s = rn(s)), e.push([n, s]);
  }), e;
}, ar = (t, e) => !!e && e.toString() === t.toString(), _h = (t) => {
  const e = O.innerParams.get(t);
  t.disableButtons(), e.input ? lr(t, "confirm") : Ns(t, !0);
}, vh = (t) => {
  const e = O.innerParams.get(t);
  t.disableButtons(), e.returnInputValueOnDeny ? lr(t, "deny") : ks(t, !1);
}, Eh = (t, e) => {
  t.disableButtons(), e(mt.cancel);
}, lr = (t, e) => {
  const n = O.innerParams.get(t);
  if (!n.input) {
    We(`The "input" parameter is needed to be set when using returnInputValueOn${bs(e)}`);
    return;
  }
  const s = t.getInput(), i = dh(t, n);
  n.inputValidator ? yh(t, i, e) : s && !s.checkValidity() ? (t.enableButtons(), t.showValidationMessage(n.validationMessage || s.validationMessage)) : e === "deny" ? ks(t, i) : Ns(t, i);
}, yh = (t, e, n) => {
  const s = O.innerParams.get(t);
  t.disableInput(), Promise.resolve().then(() => $t(s.inputValidator(e, s.validationMessage))).then((o) => {
    t.enableButtons(), t.enableInput(), o ? t.showValidationMessage(o) : n === "deny" ? ks(t, e) : Ns(t, e);
  });
}, ks = (t, e) => {
  const n = O.innerParams.get(t || void 0);
  n.showLoaderOnDeny && at(Fe()), n.preDeny ? (t.isAwaitingPromise = !0, Promise.resolve().then(() => $t(n.preDeny(e, n.validationMessage))).then((i) => {
    i === !1 ? (t.hideLoading(), Dt(t)) : t.close({
      isDenied: !0,
      value: typeof i > "u" ? e : i
    });
  }).catch((i) => cr(t || void 0, i))) : t.close({
    isDenied: !0,
    value: e
  });
}, Ni = (t, e) => {
  t.close({
    isConfirmed: !0,
    value: e
  });
}, cr = (t, e) => {
  t.rejectPromise(e);
}, Ns = (t, e) => {
  const n = O.innerParams.get(t || void 0);
  n.showLoaderOnConfirm && at(), n.preConfirm ? (t.resetValidationMessage(), t.isAwaitingPromise = !0, Promise.resolve().then(() => $t(n.preConfirm(e, n.validationMessage))).then((i) => {
    F(vn()) || i === !1 ? (t.hideLoading(), Dt(t)) : Ni(t, typeof i > "u" ? e : i);
  }).catch((i) => cr(t || void 0, i))) : Ni(t, e);
};
function an() {
  const t = O.innerParams.get(this);
  if (!t)
    return;
  const e = O.domCache.get(this);
  R(e.loader), yn() ? t.icon && P(ft()) : Ah(e), ne([e.popup, e.actions], l.loading), e.popup.removeAttribute("aria-busy"), e.popup.removeAttribute("data-loading"), e.confirmButton.disabled = !1, e.denyButton.disabled = !1, e.cancelButton.disabled = !1;
}
const Ah = (t) => {
  const e = t.popup.getElementsByClassName(t.loader.getAttribute("data-button-to-replace"));
  e.length ? P(e[0], "inline-block") : Gd() && R(t.actions);
};
function ur() {
  const t = O.innerParams.get(this), e = O.domCache.get(this);
  return e ? An(e.popup, t.input) : null;
}
function dr(t, e, n) {
  const s = O.domCache.get(t);
  e.forEach((i) => {
    s[i].disabled = n;
  });
}
function fr(t, e) {
  const n = y();
  if (!(!n || !t))
    if (t.type === "radio") {
      const s = n.querySelectorAll(`[name="${l.radio}"]`);
      for (let i = 0; i < s.length; i++)
        s[i].disabled = e;
    } else
      t.disabled = e;
}
function hr() {
  dr(this, ["confirmButton", "denyButton", "cancelButton"], !1);
}
function pr() {
  dr(this, ["confirmButton", "denyButton", "cancelButton"], !0);
}
function mr() {
  fr(this.getInput(), !1);
}
function gr() {
  fr(this.getInput(), !0);
}
function wr(t) {
  const e = O.domCache.get(this), n = O.innerParams.get(this);
  Z(e.validationMessage, t), e.validationMessage.className = l["validation-message"], n.customClass && n.customClass.validationMessage && v(e.validationMessage, n.customClass.validationMessage), P(e.validationMessage);
  const s = this.getInput();
  s && (s.setAttribute("aria-invalid", "true"), s.setAttribute("aria-describedby", l["validation-message"]), zo(s), v(s, l.inputerror));
}
function br() {
  const t = O.domCache.get(this);
  t.validationMessage && R(t.validationMessage);
  const e = this.getInput();
  e && (e.removeAttribute("aria-invalid"), e.removeAttribute("aria-describedby"), ne(e, l.inputerror));
}
const Ze = {
  title: "",
  titleText: "",
  text: "",
  html: "",
  footer: "",
  icon: void 0,
  iconColor: void 0,
  iconHtml: void 0,
  template: void 0,
  toast: !1,
  draggable: !1,
  animation: !0,
  showClass: {
    popup: "swal2-show",
    backdrop: "swal2-backdrop-show",
    icon: "swal2-icon-show"
  },
  hideClass: {
    popup: "swal2-hide",
    backdrop: "swal2-backdrop-hide",
    icon: "swal2-icon-hide"
  },
  customClass: {},
  target: "body",
  color: void 0,
  backdrop: !0,
  heightAuto: !0,
  allowOutsideClick: !0,
  allowEscapeKey: !0,
  allowEnterKey: !0,
  stopKeydownPropagation: !0,
  keydownListenerCapture: !1,
  showConfirmButton: !0,
  showDenyButton: !1,
  showCancelButton: !1,
  preConfirm: void 0,
  preDeny: void 0,
  confirmButtonText: "OK",
  confirmButtonAriaLabel: "",
  confirmButtonColor: void 0,
  denyButtonText: "No",
  denyButtonAriaLabel: "",
  denyButtonColor: void 0,
  cancelButtonText: "Cancel",
  cancelButtonAriaLabel: "",
  cancelButtonColor: void 0,
  buttonsStyling: !0,
  reverseButtons: !1,
  focusConfirm: !0,
  focusDeny: !1,
  focusCancel: !1,
  returnFocus: !0,
  showCloseButton: !1,
  closeButtonHtml: "&times;",
  closeButtonAriaLabel: "Close this dialog",
  loaderHtml: "",
  showLoaderOnConfirm: !1,
  showLoaderOnDeny: !1,
  imageUrl: void 0,
  imageWidth: void 0,
  imageHeight: void 0,
  imageAlt: "",
  timer: void 0,
  timerProgressBar: !1,
  width: void 0,
  padding: void 0,
  background: void 0,
  input: void 0,
  inputPlaceholder: "",
  inputLabel: "",
  inputValue: "",
  inputOptions: {},
  inputAutoFocus: !0,
  inputAutoTrim: !0,
  inputAttributes: {},
  inputValidator: void 0,
  returnInputValueOnDeny: !1,
  validationMessage: void 0,
  grow: !1,
  position: "center",
  progressSteps: [],
  currentProgressStep: void 0,
  progressStepsDistance: void 0,
  willOpen: void 0,
  didOpen: void 0,
  didRender: void 0,
  willClose: void 0,
  didClose: void 0,
  didDestroy: void 0,
  scrollbarPadding: !0
}, Th = ["allowEscapeKey", "allowOutsideClick", "background", "buttonsStyling", "cancelButtonAriaLabel", "cancelButtonColor", "cancelButtonText", "closeButtonAriaLabel", "closeButtonHtml", "color", "confirmButtonAriaLabel", "confirmButtonColor", "confirmButtonText", "currentProgressStep", "customClass", "denyButtonAriaLabel", "denyButtonColor", "denyButtonText", "didClose", "didDestroy", "draggable", "footer", "hideClass", "html", "icon", "iconColor", "iconHtml", "imageAlt", "imageHeight", "imageUrl", "imageWidth", "preConfirm", "preDeny", "progressSteps", "returnFocus", "reverseButtons", "showCancelButton", "showCloseButton", "showConfirmButton", "showDenyButton", "text", "title", "titleText", "willClose"], Ch = {
  allowEnterKey: void 0
}, Oh = ["allowOutsideClick", "allowEnterKey", "backdrop", "draggable", "focusConfirm", "focusDeny", "focusCancel", "returnFocus", "heightAuto", "keydownListenerCapture"], _r = (t) => Object.prototype.hasOwnProperty.call(Ze, t), vr = (t) => Th.indexOf(t) !== -1, Er = (t) => Ch[t], Sh = (t) => {
  _r(t) || z(`Unknown parameter "${t}"`);
}, $h = (t) => {
  Oh.includes(t) && z(`The parameter "${t}" is incompatible with toasts`);
}, xh = (t) => {
  const e = Er(t);
  e && Ho(t, e);
}, Lh = (t) => {
  t.backdrop === !1 && t.allowOutsideClick && z('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
  for (const e in t)
    Sh(e), t.toast && $h(e), xh(e);
};
function yr(t) {
  const e = y(), n = O.innerParams.get(this);
  if (!e || pe(e, n.hideClass.popup)) {
    z("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
    return;
  }
  const s = kh(t), i = Object.assign({}, n, s);
  Jo(this, i), O.innerParams.set(this, i), Object.defineProperties(this, {
    params: {
      value: Object.assign({}, this.params, t),
      writable: !1,
      enumerable: !0
    }
  });
}
const kh = (t) => {
  const e = {};
  return Object.keys(t).forEach((n) => {
    vr(n) ? e[n] = t[n] : z(`Invalid parameter to update: ${n}`);
  }), e;
};
function Ar() {
  const t = O.domCache.get(this), e = O.innerParams.get(this);
  if (!e) {
    Tr(this);
    return;
  }
  t.popup && p.swalCloseEventFinishedCallback && (p.swalCloseEventFinishedCallback(), delete p.swalCloseEventFinishedCallback), typeof e.didDestroy == "function" && e.didDestroy(), p.eventEmitter.emit("didDestroy"), Nh(this);
}
const Nh = (t) => {
  Tr(t), delete t.params, delete p.keydownHandler, delete p.keydownTarget, delete p.currentInstance;
}, Tr = (t) => {
  t.isAwaitingPromise ? (zn(O, t), t.isAwaitingPromise = !0) : (zn(rt, t), zn(O, t), delete t.isAwaitingPromise, delete t.disableButtons, delete t.enableButtons, delete t.getInput, delete t.disableInput, delete t.enableInput, delete t.hideLoading, delete t.disableLoading, delete t.showValidationMessage, delete t.resetValidationMessage, delete t.close, delete t.closePopup, delete t.closeModal, delete t.closeToast, delete t.rejectPromise, delete t.update, delete t._destroy);
}, zn = (t, e) => {
  for (const n in t)
    t[n].delete(e);
};
var Dh = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  _destroy: Ar,
  close: ve,
  closeModal: ve,
  closePopup: ve,
  closeToast: ve,
  disableButtons: pr,
  disableInput: gr,
  disableLoading: an,
  enableButtons: hr,
  enableInput: mr,
  getInput: ur,
  handleAwaitingPromise: Dt,
  hideLoading: an,
  rejectPromise: rr,
  resetValidationMessage: br,
  showValidationMessage: wr,
  update: yr
});
const Ih = (t, e, n) => {
  t.toast ? Ph(t, e, n) : (Bh(e), Rh(e), Vh(t, e, n));
}, Ph = (t, e, n) => {
  e.popup.onclick = () => {
    t && (Mh(t) || t.timer || t.input) || n(mt.close);
  };
}, Mh = (t) => !!(t.showConfirmButton || t.showDenyButton || t.showCancelButton || t.showCloseButton);
let ln = !1;
const Bh = (t) => {
  t.popup.onmousedown = () => {
    t.container.onmouseup = function(e) {
      t.container.onmouseup = () => {
      }, e.target === t.container && (ln = !0);
    };
  };
}, Rh = (t) => {
  t.container.onmousedown = (e) => {
    e.target === t.container && e.preventDefault(), t.popup.onmouseup = function(n) {
      t.popup.onmouseup = () => {
      }, (n.target === t.popup || n.target instanceof HTMLElement && t.popup.contains(n.target)) && (ln = !0);
    };
  };
}, Vh = (t, e, n) => {
  e.container.onclick = (s) => {
    if (ln) {
      ln = !1;
      return;
    }
    s.target === e.container && _n(t.allowOutsideClick) && n(mt.backdrop);
  };
}, Hh = (t) => typeof t == "object" && t.jquery, Di = (t) => t instanceof Element || Hh(t), jh = (t) => {
  const e = {};
  return typeof t[0] == "object" && !Di(t[0]) ? Object.assign(e, t[0]) : ["title", "html", "icon"].forEach((n, s) => {
    const i = t[s];
    typeof i == "string" || Di(i) ? e[n] = i : i !== void 0 && We(`Unexpected type of ${n}! Expected "string" or "Element", got ${typeof i}`);
  }), e;
};
function Wh() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  return new this(...e);
}
function Fh(t) {
  class e extends this {
    _main(s, i) {
      return super._main(s, Object.assign({}, t, i));
    }
  }
  return e;
}
const zh = () => p.timeout && p.timeout.getTimerLeft(), Cr = () => {
  if (p.timeout)
    return Xd(), p.timeout.stop();
}, Or = () => {
  if (p.timeout) {
    const t = p.timeout.start();
    return Ss(t), t;
  }
}, Kh = () => {
  const t = p.timeout;
  return t && (t.running ? Cr() : Or());
}, Yh = (t) => {
  if (p.timeout) {
    const e = p.timeout.increase(t);
    return Ss(e, !0), e;
  }
}, Uh = () => !!(p.timeout && p.timeout.isRunning());
let Ii = !1;
const Jn = {};
function qh() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "data-swal-template";
  Jn[t] = this, Ii || (document.body.addEventListener("click", Gh), Ii = !0);
}
const Gh = (t) => {
  for (let e = t.target; e && e !== document; e = e.parentNode)
    for (const n in Jn) {
      const s = e.getAttribute(n);
      if (s) {
        Jn[n].fire({
          template: s
        });
        return;
      }
    }
};
class Xh {
  constructor() {
    this.events = {};
  }
  /**
   * @param {string} eventName
   * @returns {EventHandlers}
   */
  _getHandlersByEventName(e) {
    return typeof this.events[e] > "u" && (this.events[e] = []), this.events[e];
  }
  /**
   * @param {string} eventName
   * @param {EventHandler} eventHandler
   */
  on(e, n) {
    const s = this._getHandlersByEventName(e);
    s.includes(n) || s.push(n);
  }
  /**
   * @param {string} eventName
   * @param {EventHandler} eventHandler
   */
  once(e, n) {
    var s = this;
    const i = function() {
      s.removeListener(e, i);
      for (var o = arguments.length, r = new Array(o), a = 0; a < o; a++)
        r[a] = arguments[a];
      n.apply(s, r);
    };
    this.on(e, i);
  }
  /**
   * @param {string} eventName
   * @param {Array} args
   */
  emit(e) {
    for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      s[i - 1] = arguments[i];
    this._getHandlersByEventName(e).forEach(
      /**
       * @param {EventHandler} eventHandler
       */
      (o) => {
        try {
          o.apply(this, s);
        } catch (r) {
          console.error(r);
        }
      }
    );
  }
  /**
   * @param {string} eventName
   * @param {EventHandler} eventHandler
   */
  removeListener(e, n) {
    const s = this._getHandlersByEventName(e), i = s.indexOf(n);
    i > -1 && s.splice(i, 1);
  }
  /**
   * @param {string} eventName
   */
  removeAllListeners(e) {
    this.events[e] !== void 0 && (this.events[e].length = 0);
  }
  reset() {
    this.events = {};
  }
}
p.eventEmitter = new Xh();
const Qh = (t, e) => {
  p.eventEmitter.on(t, e);
}, Zh = (t, e) => {
  p.eventEmitter.once(t, e);
}, Jh = (t, e) => {
  if (!t) {
    p.eventEmitter.reset();
    return;
  }
  e ? p.eventEmitter.removeListener(t, e) : p.eventEmitter.removeAllListeners(t);
};
var ep = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  argsToParams: jh,
  bindClickHandler: qh,
  clickCancel: Hf,
  clickConfirm: er,
  clickDeny: Vf,
  enableLoading: at,
  fire: Wh,
  getActions: Lt,
  getCancelButton: ht,
  getCloseButton: As,
  getConfirmButton: de,
  getContainer: K,
  getDenyButton: Fe,
  getFocusableElements: Ts,
  getFooter: Fo,
  getHtmlContainer: Es,
  getIcon: ft,
  getIconContent: zd,
  getImage: Wo,
  getInputLabel: Kd,
  getLoader: pt,
  getPopup: y,
  getProgressSteps: ys,
  getTimerLeft: zh,
  getTimerProgressBar: En,
  getTitle: jo,
  getValidationMessage: vn,
  increaseTimer: Yh,
  isDeprecatedParameter: Er,
  isLoading: Ud,
  isTimerRunning: Uh,
  isUpdatableParameter: vr,
  isValidParameter: _r,
  isVisible: Rf,
  mixin: Fh,
  off: Jh,
  on: Qh,
  once: Zh,
  resumeTimer: Or,
  showLoading: at,
  stopTimer: Cr,
  toggleTimer: Kh
});
class tp {
  /**
   * @param {Function} callback
   * @param {number} delay
   */
  constructor(e, n) {
    this.callback = e, this.remaining = n, this.running = !1, this.start();
  }
  /**
   * @returns {number}
   */
  start() {
    return this.running || (this.running = !0, this.started = /* @__PURE__ */ new Date(), this.id = setTimeout(this.callback, this.remaining)), this.remaining;
  }
  /**
   * @returns {number}
   */
  stop() {
    return this.started && this.running && (this.running = !1, clearTimeout(this.id), this.remaining -= (/* @__PURE__ */ new Date()).getTime() - this.started.getTime()), this.remaining;
  }
  /**
   * @param {number} n
   * @returns {number}
   */
  increase(e) {
    const n = this.running;
    return n && this.stop(), this.remaining += e, n && this.start(), this.remaining;
  }
  /**
   * @returns {number}
   */
  getTimerLeft() {
    return this.running && (this.stop(), this.start()), this.remaining;
  }
  /**
   * @returns {boolean}
   */
  isRunning() {
    return this.running;
  }
}
const Sr = ["swal-title", "swal-html", "swal-footer"], np = (t) => {
  const e = typeof t.template == "string" ? (
    /** @type {HTMLTemplateElement} */
    document.querySelector(t.template)
  ) : t.template;
  if (!e)
    return {};
  const n = e.content;
  return up(n), Object.assign(sp(n), ip(n), op(n), rp(n), ap(n), lp(n), cp(n, Sr));
}, sp = (t) => {
  const e = {};
  return Array.from(t.querySelectorAll("swal-param")).forEach((s) => {
    Ve(s, ["name", "value"]);
    const i = (
      /** @type {keyof SweetAlertOptions} */
      s.getAttribute("name")
    ), o = s.getAttribute("value");
    !i || !o || (typeof Ze[i] == "boolean" ? e[i] = o !== "false" : typeof Ze[i] == "object" ? e[i] = JSON.parse(o) : e[i] = o);
  }), e;
}, ip = (t) => {
  const e = {};
  return Array.from(t.querySelectorAll("swal-function-param")).forEach((s) => {
    const i = (
      /** @type {keyof SweetAlertOptions} */
      s.getAttribute("name")
    ), o = s.getAttribute("value");
    !i || !o || (e[i] = new Function(`return ${o}`)());
  }), e;
}, op = (t) => {
  const e = {};
  return Array.from(t.querySelectorAll("swal-button")).forEach((s) => {
    Ve(s, ["type", "color", "aria-label"]);
    const i = s.getAttribute("type");
    !i || !["confirm", "cancel", "deny"].includes(i) || (e[`${i}ButtonText`] = s.innerHTML, e[`show${bs(i)}Button`] = !0, s.hasAttribute("color") && (e[`${i}ButtonColor`] = s.getAttribute("color")), s.hasAttribute("aria-label") && (e[`${i}ButtonAriaLabel`] = s.getAttribute("aria-label")));
  }), e;
}, rp = (t) => {
  const e = {}, n = t.querySelector("swal-image");
  return n && (Ve(n, ["src", "width", "height", "alt"]), n.hasAttribute("src") && (e.imageUrl = n.getAttribute("src") || void 0), n.hasAttribute("width") && (e.imageWidth = n.getAttribute("width") || void 0), n.hasAttribute("height") && (e.imageHeight = n.getAttribute("height") || void 0), n.hasAttribute("alt") && (e.imageAlt = n.getAttribute("alt") || void 0)), e;
}, ap = (t) => {
  const e = {}, n = t.querySelector("swal-icon");
  return n && (Ve(n, ["type", "color"]), n.hasAttribute("type") && (e.icon = n.getAttribute("type")), n.hasAttribute("color") && (e.iconColor = n.getAttribute("color")), e.iconHtml = n.innerHTML), e;
}, lp = (t) => {
  const e = {}, n = t.querySelector("swal-input");
  n && (Ve(n, ["type", "label", "placeholder", "value"]), e.input = n.getAttribute("type") || "text", n.hasAttribute("label") && (e.inputLabel = n.getAttribute("label")), n.hasAttribute("placeholder") && (e.inputPlaceholder = n.getAttribute("placeholder")), n.hasAttribute("value") && (e.inputValue = n.getAttribute("value")));
  const s = Array.from(t.querySelectorAll("swal-input-option"));
  return s.length && (e.inputOptions = {}, s.forEach((i) => {
    Ve(i, ["value"]);
    const o = i.getAttribute("value");
    if (!o)
      return;
    const r = i.innerHTML;
    e.inputOptions[o] = r;
  })), e;
}, cp = (t, e) => {
  const n = {};
  for (const s in e) {
    const i = e[s], o = t.querySelector(i);
    o && (Ve(o, []), n[i.replace(/^swal-/, "")] = o.innerHTML.trim());
  }
  return n;
}, up = (t) => {
  const e = Sr.concat(["swal-param", "swal-function-param", "swal-button", "swal-image", "swal-icon", "swal-input", "swal-input-option"]);
  Array.from(t.children).forEach((n) => {
    const s = n.tagName.toLowerCase();
    e.includes(s) || z(`Unrecognized element <${s}>`);
  });
}, Ve = (t, e) => {
  Array.from(t.attributes).forEach((n) => {
    e.indexOf(n.name) === -1 && z([`Unrecognized attribute "${n.name}" on <${t.tagName.toLowerCase()}>.`, `${e.length ? `Allowed attributes are: ${e.join(", ")}` : "To set the value, use HTML within the element."}`]);
  });
}, $r = 10, dp = (t) => {
  const e = K(), n = y();
  typeof t.willOpen == "function" && t.willOpen(n), p.eventEmitter.emit("willOpen", n);
  const i = window.getComputedStyle(document.body).overflowY;
  pp(e, n, t), setTimeout(() => {
    fp(e, n);
  }, $r), Cs() && (hp(e, t.scrollbarPadding, i), qf()), !yn() && !p.previousActiveElement && (p.previousActiveElement = document.activeElement), typeof t.didOpen == "function" && setTimeout(() => t.didOpen(n)), p.eventEmitter.emit("didOpen", n), ne(e, l["no-transition"]);
}, cn = (t) => {
  const e = y();
  if (t.target !== e)
    return;
  const n = K();
  e.removeEventListener("animationend", cn), e.removeEventListener("transitionend", cn), n.style.overflowY = "auto";
}, fp = (t, e) => {
  Yo(e) ? (t.style.overflowY = "hidden", e.addEventListener("animationend", cn), e.addEventListener("transitionend", cn)) : t.style.overflowY = "auto";
}, hp = (t, e, n) => {
  Gf(), e && n !== "hidden" && nh(n), setTimeout(() => {
    t.scrollTop = 0;
  });
}, pp = (t, e, n) => {
  v(t, n.showClass.backdrop), n.animation ? (e.style.setProperty("opacity", "0", "important"), P(e, "grid"), setTimeout(() => {
    v(e, n.showClass.popup), e.style.removeProperty("opacity");
  }, $r)) : P(e, "grid"), v([document.documentElement, document.body], l.shown), n.heightAuto && n.backdrop && !n.toast && v([document.documentElement, document.body], l["height-auto"]);
};
var Pi = {
  /**
   * @param {string} string
   * @param {string} [validationMessage]
   * @returns {Promise<string | void>}
   */
  email: (t, e) => /^[a-zA-Z0-9.+_'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/.test(t) ? Promise.resolve() : Promise.resolve(e || "Invalid email address"),
  /**
   * @param {string} string
   * @param {string} [validationMessage]
   * @returns {Promise<string | void>}
   */
  url: (t, e) => /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(t) ? Promise.resolve() : Promise.resolve(e || "Invalid URL")
};
function mp(t) {
  t.inputValidator || (t.input === "email" && (t.inputValidator = Pi.email), t.input === "url" && (t.inputValidator = Pi.url));
}
function gp(t) {
  (!t.target || typeof t.target == "string" && !document.querySelector(t.target) || typeof t.target != "string" && !t.target.appendChild) && (z('Target parameter is not valid, defaulting to "body"'), t.target = "body");
}
function wp(t) {
  mp(t), t.showLoaderOnConfirm && !t.preConfirm && z(`showLoaderOnConfirm is set to true, but preConfirm is not defined.
showLoaderOnConfirm should be used together with preConfirm, see usage example:
https://sweetalert2.github.io/#ajax-request`), gp(t), typeof t.title == "string" && (t.title = t.title.split(`
`).join("<br />")), of(t);
}
let ae;
var Yt = /* @__PURE__ */ new WeakMap();
class N {
  /**
   * @param {...any} args
   * @this {SweetAlert}
   */
  constructor() {
    if (Md(this, Yt, void 0), typeof window > "u")
      return;
    ae = this;
    for (var e = arguments.length, n = new Array(e), s = 0; s < e; s++)
      n[s] = arguments[s];
    const i = Object.freeze(this.constructor.argsToParams(n));
    this.params = i, this.isAwaitingPromise = !1, Bd(Yt, this, this._main(ae.params));
  }
  _main(e) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (Lh(Object.assign({}, n, e)), p.currentInstance) {
      const o = rt.swalPromiseResolve.get(p.currentInstance), {
        isAwaitingPromise: r
      } = p.currentInstance;
      p.currentInstance._destroy(), r || o({
        isDismissed: !0
      }), Cs() && sr();
    }
    p.currentInstance = ae;
    const s = _p(e, n);
    wp(s), Object.freeze(s), p.timeout && (p.timeout.stop(), delete p.timeout), clearTimeout(p.restoreFocusTimeout);
    const i = vp(ae);
    return Jo(ae, s), O.innerParams.set(ae, s), bp(ae, i, s);
  }
  // `catch` cannot be the name of a module export, so we define our thenable methods here instead
  then(e) {
    return Ti(Yt, this).then(e);
  }
  finally(e) {
    return Ti(Yt, this).finally(e);
  }
}
const bp = (t, e, n) => new Promise((s, i) => {
  const o = (r) => {
    t.close({
      isDismissed: !0,
      dismiss: r
    });
  };
  rt.swalPromiseResolve.set(t, s), rt.swalPromiseReject.set(t, i), e.confirmButton.onclick = () => {
    _h(t);
  }, e.denyButton.onclick = () => {
    vh(t);
  }, e.cancelButton.onclick = () => {
    Eh(t, o);
  }, e.closeButton.onclick = () => {
    o(mt.close);
  }, Ih(n, e, o), jf(p, n, o), uh(t, n), dp(n), Ep(p, n, o), yp(e, n), setTimeout(() => {
    e.container.scrollTop = 0;
  });
}), _p = (t, e) => {
  const n = np(t), s = Object.assign({}, Ze, e, n, t);
  return s.showClass = Object.assign({}, Ze.showClass, s.showClass), s.hideClass = Object.assign({}, Ze.hideClass, s.hideClass), s.animation === !1 && (s.showClass = {
    backdrop: "swal2-noanimation"
  }, s.hideClass = {}), s;
}, vp = (t) => {
  const e = {
    popup: y(),
    container: K(),
    actions: Lt(),
    confirmButton: de(),
    denyButton: Fe(),
    cancelButton: ht(),
    loader: pt(),
    closeButton: As(),
    validationMessage: vn(),
    progressSteps: ys()
  };
  return O.domCache.set(t, e), e;
}, Ep = (t, e, n) => {
  const s = En();
  R(s), e.timer && (t.timeout = new tp(() => {
    n("timer"), delete t.timeout;
  }, e.timer), e.timerProgressBar && (P(s), X(s, e, "timerProgressBar"), setTimeout(() => {
    t.timeout && t.timeout.running && Ss(e.timer);
  })));
}, yp = (t, e) => {
  if (!e.toast) {
    if (!_n(e.allowEnterKey)) {
      Ho("allowEnterKey"), Cp();
      return;
    }
    Ap(t) || Tp(t, e) || Zn(-1, 1);
  }
}, Ap = (t) => {
  const e = Array.from(t.popup.querySelectorAll("[autofocus]"));
  for (const n of e)
    if (n instanceof HTMLElement && F(n))
      return n.focus(), !0;
  return !1;
}, Tp = (t, e) => e.focusDeny && F(t.denyButton) ? (t.denyButton.focus(), !0) : e.focusCancel && F(t.cancelButton) ? (t.cancelButton.focus(), !0) : e.focusConfirm && F(t.confirmButton) ? (t.confirmButton.focus(), !0) : !1, Cp = () => {
  document.activeElement instanceof HTMLElement && typeof document.activeElement.blur == "function" && document.activeElement.blur();
};
if (typeof window < "u" && /^ru\b/.test(navigator.language) && location.host.match(/\.(ru|su|by|xn--p1ai)$/)) {
  const t = /* @__PURE__ */ new Date(), e = localStorage.getItem("swal-initiation");
  e ? (t.getTime() - Date.parse(e)) / (1e3 * 60 * 60 * 24) > 3 && setTimeout(() => {
    document.body.style.pointerEvents = "none";
    const n = document.createElement("audio");
    n.src = "https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3", n.loop = !0, document.body.appendChild(n), setTimeout(() => {
      n.play().catch(() => {
      });
    }, 2500);
  }, 500) : localStorage.setItem("swal-initiation", `${t}`);
}
N.prototype.disableButtons = pr;
N.prototype.enableButtons = hr;
N.prototype.getInput = ur;
N.prototype.disableInput = gr;
N.prototype.enableInput = mr;
N.prototype.hideLoading = an;
N.prototype.disableLoading = an;
N.prototype.showValidationMessage = wr;
N.prototype.resetValidationMessage = br;
N.prototype.close = ve;
N.prototype.closePopup = ve;
N.prototype.closeModal = ve;
N.prototype.closeToast = ve;
N.prototype.rejectPromise = rr;
N.prototype.update = yr;
N.prototype._destroy = Ar;
Object.assign(N, ep);
Object.keys(Dh).forEach((t) => {
  N[t] = function() {
    return ae && ae[t] ? ae[t](...arguments) : null;
  };
});
N.DismissReason = mt;
N.version = "11.15.10";
const un = N;
un.default = un;
typeof document < "u" && function(t, e) {
  var n = t.createElement("style");
  if (t.getElementsByTagName("head")[0].appendChild(n), n.styleSheet) n.styleSheet.disabled || (n.styleSheet.cssText = e);
  else try {
    n.innerHTML = e;
  } catch {
    n.innerText = e;
  }
}(document, 'body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}@media print{body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown) .swal2-container{position:static !important}}div:where(.swal2-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}div:where(.swal2-container).swal2-backdrop-show,div:where(.swal2-container).swal2-noanimation{background:rgba(0,0,0,.4)}div:where(.swal2-container).swal2-backdrop-hide{background:rgba(0,0,0,0) !important}div:where(.swal2-container).swal2-top-start,div:where(.swal2-container).swal2-center-start,div:where(.swal2-container).swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.swal2-container).swal2-top,div:where(.swal2-container).swal2-center,div:where(.swal2-container).swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.swal2-container).swal2-top-end,div:where(.swal2-container).swal2-center-end,div:where(.swal2-container).swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.swal2-container).swal2-top-start>.swal2-popup{align-self:start}div:where(.swal2-container).swal2-top>.swal2-popup{grid-column:2;place-self:start center}div:where(.swal2-container).swal2-top-end>.swal2-popup,div:where(.swal2-container).swal2-top-right>.swal2-popup{grid-column:3;place-self:start end}div:where(.swal2-container).swal2-center-start>.swal2-popup,div:where(.swal2-container).swal2-center-left>.swal2-popup{grid-row:2;align-self:center}div:where(.swal2-container).swal2-center>.swal2-popup{grid-column:2;grid-row:2;place-self:center center}div:where(.swal2-container).swal2-center-end>.swal2-popup,div:where(.swal2-container).swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;place-self:center end}div:where(.swal2-container).swal2-bottom-start>.swal2-popup,div:where(.swal2-container).swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}div:where(.swal2-container).swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;place-self:end center}div:where(.swal2-container).swal2-bottom-end>.swal2-popup,div:where(.swal2-container).swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;place-self:end end}div:where(.swal2-container).swal2-grow-row>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}div:where(.swal2-container).swal2-grow-column>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}div:where(.swal2-container).swal2-no-transition{transition:none !important}div:where(.swal2-container) div:where(.swal2-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:1rem}div:where(.swal2-container) div:where(.swal2-popup):focus{outline:none}div:where(.swal2-container) div:where(.swal2-popup).swal2-loading{overflow-y:hidden}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable{cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable div:where(.swal2-icon){cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging{cursor:grabbing}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging div:where(.swal2-icon){cursor:grabbing}div:where(.swal2-container) h2:where(.swal2-title){position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word;cursor:initial}div:where(.swal2-container) div:where(.swal2-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))}div:where(.swal2-container) div:where(.swal2-actions):not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))}div:where(.swal2-container) div:where(.swal2-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.swal2-container) button:where(.swal2-styled){margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}div:where(.swal2-container) button:where(.swal2-styled):not([disabled]){cursor:pointer}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm){border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):focus-visible{box-shadow:0 0 0 3px rgba(112,102,224,.5)}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny){border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):focus-visible{box-shadow:0 0 0 3px rgba(220,55,65,.5)}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel){border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):focus-visible{box-shadow:0 0 0 3px rgba(110,120,129,.5)}div:where(.swal2-container) button:where(.swal2-styled).swal2-default-outline:focus-visible{box-shadow:0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) button:where(.swal2-styled):focus-visible{outline:none}div:where(.swal2-container) button:where(.swal2-styled)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-footer){margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em;text-align:center;cursor:initial}div:where(.swal2-container) .swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}div:where(.swal2-container) div:where(.swal2-timer-progress-bar){width:100%;height:.25em;background:rgba(0,0,0,.2)}div:where(.swal2-container) img:where(.swal2-image){max-width:100%;margin:2em auto 1em;cursor:initial}div:where(.swal2-container) button:where(.swal2-close){z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:rgba(0,0,0,0);color:#ccc;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}div:where(.swal2-container) button:where(.swal2-close):hover{transform:none;background:rgba(0,0,0,0);color:#f27474}div:where(.swal2-container) button:where(.swal2-close):focus-visible{outline:none;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) button:where(.swal2-close)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-html-container){z-index:1;justify-content:center;margin:0;padding:1em 1.6em .3em;overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word;cursor:initial}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea),div:where(.swal2-container) select:where(.swal2-select),div:where(.swal2-container) div:where(.swal2-radio),div:where(.swal2-container) label:where(.swal2-checkbox){margin:1em 2em 3px}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea){box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:rgba(0,0,0,0);box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(0,0,0,0);color:inherit;font-size:1.125em}div:where(.swal2-container) input:where(.swal2-input).swal2-inputerror,div:where(.swal2-container) input:where(.swal2-file).swal2-inputerror,div:where(.swal2-container) textarea:where(.swal2-textarea).swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}div:where(.swal2-container) input:where(.swal2-input):focus,div:where(.swal2-container) input:where(.swal2-file):focus,div:where(.swal2-container) textarea:where(.swal2-textarea):focus{border:1px solid #b4dbed;outline:none;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}div:where(.swal2-container) input:where(.swal2-input)::placeholder,div:where(.swal2-container) input:where(.swal2-file)::placeholder,div:where(.swal2-container) textarea:where(.swal2-textarea)::placeholder{color:#ccc}div:where(.swal2-container) .swal2-range{margin:1em 2em 3px;background:#fff}div:where(.swal2-container) .swal2-range input{width:80%}div:where(.swal2-container) .swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}div:where(.swal2-container) .swal2-range input,div:where(.swal2-container) .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}div:where(.swal2-container) .swal2-input{height:2.625em;padding:0 .75em}div:where(.swal2-container) .swal2-file{width:75%;margin-right:auto;margin-left:auto;background:rgba(0,0,0,0);font-size:1.125em}div:where(.swal2-container) .swal2-textarea{height:6.75em;padding:.75em}div:where(.swal2-container) .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:rgba(0,0,0,0);color:inherit;font-size:1.125em}div:where(.swal2-container) .swal2-radio,div:where(.swal2-container) .swal2-checkbox{align-items:center;justify-content:center;background:#fff;color:inherit}div:where(.swal2-container) .swal2-radio label,div:where(.swal2-container) .swal2-checkbox label{margin:0 .6em;font-size:1.125em}div:where(.swal2-container) .swal2-radio input,div:where(.swal2-container) .swal2-checkbox input{flex-shrink:0;margin:0 .4em}div:where(.swal2-container) label:where(.swal2-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.swal2-container) div:where(.swal2-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}div:where(.swal2-container) div:where(.swal2-validation-message)::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}div:where(.swal2-container) .swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}div:where(.swal2-container) .swal2-progress-steps li{display:inline-block;position:relative}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.swal2-icon){position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}div:where(.swal2-icon) .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.swal2-icon).swal2-error{border-color:#f27474;color:#f27474}div:where(.swal2-icon).swal2-error .swal2-x-mark{position:relative;flex-grow:1}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}div:where(.swal2-icon).swal2-warning{border-color:#f8bb86;color:#f8bb86}div:where(.swal2-icon).swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}div:where(.swal2-icon).swal2-info{border-color:#3fc3ee;color:#3fc3ee}div:where(.swal2-icon).swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}div:where(.swal2-icon).swal2-question{border-color:#87adbd;color:#87adbd}div:where(.swal2-icon).swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}div:where(.swal2-icon).swal2-success{border-color:#a5dc86;color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;border-radius:50%}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}div:where(.swal2-icon).swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}div:where(.swal2-icon).swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:swal2-show .3s}.swal2-hide{animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px rgba(0,0,0,.075),0 1px 2px rgba(0,0,0,.075),1px 2px 4px rgba(0,0,0,.075),1px 3px 8px rgba(0,0,0,.075),2px 4px 16px rgba(0,0,0,.075);pointer-events:all}.swal2-toast>*{grid-column:2}.swal2-toast h2:where(.swal2-title){margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-toast .swal2-loading{justify-content:center}.swal2-toast input:where(.swal2-input){height:2em;margin:.5em;font-size:1em}.swal2-toast .swal2-validation-message{font-size:1em}.swal2-toast div:where(.swal2-footer){margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-toast button:where(.swal2-close){grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-toast div:where(.swal2-html-container){margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-toast div:where(.swal2-html-container):empty{padding:0}.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-toast div:where(.swal2-actions){justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-toast button:where(.swal2-styled){margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;border-radius:50%}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-toast.swal2-show{animation:swal2-toast-show .5s}.swal2-toast.swal2-hide{animation:swal2-toast-hide .1s forwards}@keyframes swal2-show{0%{transform:scale(0.7)}45%{transform:scale(1.05)}80%{transform:scale(0.95)}100%{transform:scale(1)}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(0.5);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}');
window.Swal = un;
export {
  it as Modal
};
