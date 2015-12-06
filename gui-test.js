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

$(document).ready(function(){
  var el=$("#spinner_demo");
  
  // Create page layout
  var div_val=document.createElement('div');
  var div_spin=document.createElement('div');
  $(div_spin).css("background-color","#88f");
  el.html(div_val).append(div_spin);
  var vpspin=new VPSpinner($(div_spin),-5);

  // Event handlers
  $(vpspin).on("changed", function(e,val) {
    $(div_val).html(''+val);
  });
});
