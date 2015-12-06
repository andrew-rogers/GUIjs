/**
 *
 * @licstart  The following is the entire license notice for the 
 * JavaScript code in this page.
 *
 * The MIT License (MIT)
 *
 * Copyright (C) 2015  Andrew Rogers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE. 
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

var VPSpinner = function(el,ap) {
  this.el=el;
  var adj_pos=ap;
  var spin=new VariablePosSpinText(-adj_pos);

  var span_val=document.createElement('span');
  var butt_inc=document.createElement('button');
  var butt_dec=document.createElement('button');
  var butt_cl=document.createElement('button');
  var butt_cr=document.createElement('button');

  el.append(butt_cl);
  el.append(butt_cr);
  el.append(span_val);
  el.append(butt_inc);
  el.append(butt_dec);

  $(span_val).html(spin.getText());

  $(butt_inc).html('+');
  $(butt_dec).html('-');
  $(butt_cl).html('<');
  $(butt_cr).html('>');

  var jq=$(this); // This widget as jQuery object

  $(butt_inc).click(function() {
    var val=spin.adj(1);
    jq.trigger("changed",[val]);
    $(span_val).html(spin.getText());
  });
  
  $(butt_dec).click(function() {
    var val=spin.adj(-1);
    jq.trigger("changed",[val]);
    $(span_val).html(spin.getText());
  });
  
  $(butt_cl).click(function() {
    adj_pos+=1;
    spin.setAdjPos(adj_pos);
    $(span_val).html(spin.getText());
  });
  
  $(butt_cr).click(function() {
    adj_pos-=1;
    spin.setAdjPos(adj_pos);
    $(span_val).html(spin.getText());
  });
};

function spinnerDemo(el)
{
  // Create page layout for simple spinner
  el.html("Variable Precision Spinner demo");
  var div_val=document.createElement('div');
  var div_spin=document.createElement('div');
  $(div_spin).css("float","left");
  $(div_spin).css("background-color","#88f");
  el.append(div_val).append(div_spin);
  var vpspin=new VPSpinner($(div_spin),-5);
  el.append("<br><br>");

  // Event handlers
  $(vpspin).on("changed", function(e,val) {
    $(div_val).html(''+val);
  });
}

function gridLayoutDemo(el)
{
  // Create page layout for grid layout
  var div_hdr=$(document.createElement('div'));
  var div_gl=$(document.createElement('div'));
  el.append(div_hdr).append(div_gl);
  div_hdr.html("GridLayout demo");
  div_gl.width(200);
  div_gl.height(200);
  var gl=new GridLayout(div_gl,3,3);
  gl.chequer();
  var centre=gl.cells[1][1];
  var glc=new GridLayout(centre,3,3);
  glc.chequer('black','red');
  el.append("<br><br>");
}

function canvasButtonDemo(el)
{
  // Create layout for buttons
  var div_hdr=$(document.createElement('div'));
  var div_btn=$(document.createElement('div'));
  el.append(div_hdr).append(div_btn);
  div_hdr.html("Canvas Button demo");
  var div_left=$(document.createElement('div'));
  var div_right=$(document.createElement('div'));
  var div_up=$(document.createElement('div'));
  var div_down=$(document.createElement('div'));
  div_btn.height('100px');
  div_left.css("float","left");
  div_left.css("width","0");
  div_right.css("float","left");
  div_right.css("width","0");
  div_up.css("float","left");
  div_up.css("width","0");
  div_down.css("float","left");
  div_down.css("width","0");
  div_btn.append(div_left).append(div_up);
  div_btn.append(div_down).append(div_right);
  var cb_left=new CanvasButton(div_left,"triangle.left");
  var cb_up=new CanvasButton(div_up,"triangle.up");
  var cb_down=new CanvasButton(div_down,"triangle.down");
  var cb_right=new CanvasButton(div_right,"triangle.right");

  // Handle button clicks
  $(cb_left).click(function() {
    alert("Left clicked");
  });
  $(cb_right).click(function() {
    alert("Right clicked");
  });
  $(cb_up).click(function() {
    alert("Up clicked");
  });
  $(cb_down).click(function() {
    alert("Down clicked");
  });
}

function coordSpinnerDemo(el)
{
  // Create layout for buttons
  var div_hdr=$(document.createElement('div'));
  var div_val=$(document.createElement('div'));
  var div_csp=$(document.createElement('div'));
  el.append(div_hdr).append(div_val).append(div_csp);
  div_hdr.html("Coordinate Spinner demo");
  div_csp.width(200);
  var csp=new CoordSpinner(div_csp);

  // Handle changed event
  $(csp).on('changed', function(e,x,y) {
    div_val.text('('+x+','+y+')');
  });
}

$(document).ready(function(){
  spinnerDemo($("#spinner_demo"));
  gridLayoutDemo($("#grid_layout_demo"));
  canvasButtonDemo($("#canvas_button_demo"));
  coordSpinnerDemo($("#coord_spinner_demo"));
});
