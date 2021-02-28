import { StyleGenerator, StyleObject } from "./types";

declare namespace panache {
  const ThemeContext: React.Context
  const ThemeProvider: React.Provider
  function address(style: StyleObject | StyleGenerator): React.ElementType
  function article(style: StyleObject | StyleGenerator): React.ElementType
  function aside(style: StyleObject | StyleGenerator): React.ElementType
  function footer(style: StyleObject | StyleGenerator): React.ElementType
  function header(style: StyleObject | StyleGenerator): React.ElementType
  function h1(style: StyleObject | StyleGenerator): React.ElementType
  function h2(style: StyleObject | StyleGenerator): React.ElementType
  function h3(style: StyleObject | StyleGenerator): React.ElementType
  function h4(style: StyleObject | StyleGenerator): React.ElementType
  function h5(style: StyleObject | StyleGenerator): React.ElementType
  function h6(style: StyleObject | StyleGenerator): React.ElementType
  function hgroup(style: StyleObject | StyleGenerator): React.ElementType
  function main(style: StyleObject | StyleGenerator): React.ElementType
  function nav(style: StyleObject | StyleGenerator): React.ElementType
  function section(style: StyleObject | StyleGenerator): React.ElementType
  function blockquote(style: StyleObject | StyleGenerator): React.ElementType
  function dd(style: StyleObject | StyleGenerator): React.ElementType
  function div(style: StyleObject | StyleGenerator): React.ElementType
  function dl(style: StyleObject | StyleGenerator): React.ElementType
  function dt(style: StyleObject | StyleGenerator): React.ElementType
  function figcaption(style: StyleObject | StyleGenerator): React.ElementType
  function figure(style: StyleObject | StyleGenerator): React.ElementType
  function hr(style: StyleObject | StyleGenerator): React.ElementType
  function li(style: StyleObject | StyleGenerator): React.ElementType
  function ol(style: StyleObject | StyleGenerator): React.ElementType
  function p(style: StyleObject | StyleGenerator): React.ElementType
  function pre(style: StyleObject | StyleGenerator): React.ElementType
  function ul(style: StyleObject | StyleGenerator): React.ElementType
  function a(style: StyleObject | StyleGenerator): React.ElementType
  function abbr(style: StyleObject | StyleGenerator): React.ElementType
  function b(style: StyleObject | StyleGenerator): React.ElementType
  function bdi(style: StyleObject | StyleGenerator): React.ElementType
  function bdo(style: StyleObject | StyleGenerator): React.ElementType
  function br(style: StyleObject | StyleGenerator): React.ElementType
  function cite(style: StyleObject | StyleGenerator): React.ElementType
  function code(style: StyleObject | StyleGenerator): React.ElementType
  function data(style: StyleObject | StyleGenerator): React.ElementType
  function dfn(style: StyleObject | StyleGenerator): React.ElementType
  function em(style: StyleObject | StyleGenerator): React.ElementType
  function i(style: StyleObject | StyleGenerator): React.ElementType
  function kbd(style: StyleObject | StyleGenerator): React.ElementType
  function mark(style: StyleObject | StyleGenerator): React.ElementType
  function q(style: StyleObject | StyleGenerator): React.ElementType
  function rb(style: StyleObject | StyleGenerator): React.ElementType
  function rp(style: StyleObject | StyleGenerator): React.ElementType
  function rt(style: StyleObject | StyleGenerator): React.ElementType
  function rtc(style: StyleObject | StyleGenerator): React.ElementType
  function ruby(style: StyleObject | StyleGenerator): React.ElementType
  function s(style: StyleObject | StyleGenerator): React.ElementType
  function samp(style: StyleObject | StyleGenerator): React.ElementType
  function small(style: StyleObject | StyleGenerator): React.ElementType
  function span(style: StyleObject | StyleGenerator): React.ElementType
  function strong(style: StyleObject | StyleGenerator): React.ElementType
  function sub(style: StyleObject | StyleGenerator): React.ElementType
  function sup(style: StyleObject | StyleGenerator): React.ElementType
  function time(style: StyleObject | StyleGenerator): React.ElementType
  function u(style: StyleObject | StyleGenerator): React.ElementType
  //function var(style: StyleObject | StyleGenerator): React.ElementType
  function wbr(style: StyleObject | StyleGenerator): React.ElementType
  function area(style: StyleObject | StyleGenerator): React.ElementType
  function audio(style: StyleObject | StyleGenerator): React.ElementType
  function img(style: StyleObject | StyleGenerator): React.ElementType
  function map(style: StyleObject | StyleGenerator): React.ElementType
  function track(style: StyleObject | StyleGenerator): React.ElementType
  function video(style: StyleObject | StyleGenerator): React.ElementType
  function embed(style: StyleObject | StyleGenerator): React.ElementType
  function iframe(style: StyleObject | StyleGenerator): React.ElementType
  function object(style: StyleObject | StyleGenerator): React.ElementType
  function param(style: StyleObject | StyleGenerator): React.ElementType
  function picture(style: StyleObject | StyleGenerator): React.ElementType
  function source(style: StyleObject | StyleGenerator): React.ElementType
  function canvas(style: StyleObject | StyleGenerator): React.ElementType
  function noscript(style: StyleObject | StyleGenerator): React.ElementType
  function script(style: StyleObject | StyleGenerator): React.ElementType
  function del(style: StyleObject | StyleGenerator): React.ElementType
  function ins(style: StyleObject | StyleGenerator): React.ElementType
  function caption(style: StyleObject | StyleGenerator): React.ElementType
  function col(style: StyleObject | StyleGenerator): React.ElementType
  function colgroup(style: StyleObject | StyleGenerator): React.ElementType
  function table(style: StyleObject | StyleGenerator): React.ElementType
  function tbody(style: StyleObject | StyleGenerator): React.ElementType
  function td(style: StyleObject | StyleGenerator): React.ElementType
  function tfoot(style: StyleObject | StyleGenerator): React.ElementType
  function th(style: StyleObject | StyleGenerator): React.ElementType
  function thead(style: StyleObject | StyleGenerator): React.ElementType
  function tr(style: StyleObject | StyleGenerator): React.ElementType
  function button(style: StyleObject | StyleGenerator): React.ElementType
  function datalist(style: StyleObject | StyleGenerator): React.ElementType
  function fieldset(style: StyleObject | StyleGenerator): React.ElementType
  function form(style: StyleObject | StyleGenerator): React.ElementType
  function input(style: StyleObject | StyleGenerator): React.ElementType
  function label(style: StyleObject | StyleGenerator): React.ElementType
  function legend(style: StyleObject | StyleGenerator): React.ElementType
  function meter(style: StyleObject | StyleGenerator): React.ElementType
  function optgroup(style: StyleObject | StyleGenerator): React.ElementType
  function option(style: StyleObject | StyleGenerator): React.ElementType
  function output(style: StyleObject | StyleGenerator): React.ElementType
  function progress(style: StyleObject | StyleGenerator): React.ElementType
  function select(style: StyleObject | StyleGenerator): React.ElementType
  function textarea(style: StyleObject | StyleGenerator): React.ElementType
  function details(style: StyleObject | StyleGenerator): React.ElementType
  function dialog(style: StyleObject | StyleGenerator): React.ElementType
  function menu(style: StyleObject | StyleGenerator): React.ElementType
  function summary(style: StyleObject | StyleGenerator): React.ElementType
}

export = panache