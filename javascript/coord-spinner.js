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

var CoordSpinner=function(el,dp) {
  if(dp==null)dp=3;
  this.el=el;

  // If dimensions are too small then set some nicer values
  if(this.el.height()<20)this.el.height(125);
  if(this.el.width()<20)this.el.width(180);
  var bs=40;
  var bwp=(bs*100)/this.el.width();
  var midwp=100-2*bwp;
  var bhp=(bs*100)/this.el.height();
  var midhp=100-2*bhp;

  var gl=new GridLayout(this.el,[bhp,midhp,bhp],[bwp,midwp,bwp]);

  var glt=new GridLayout(gl.cells[1][1],2,1);
  glt.chequer('#cfc','#cfc'); // Pale green

  // Add the buttons
  var cb_up=new CanvasButton(gl.cells[0][1],'triangle.up');
  var cb_down=new CanvasButton(gl.cells[2][1],'triangle.down');
  var cb_left=new CanvasButton(gl.cells[1][0],'triangle.left');
  var cb_right=new CanvasButton(gl.cells[1][2],'triangle.right');
  var cb_cleft=new CanvasButton(gl.cells[2][0],'arrow.left');
  var cb_cright=new CanvasButton(gl.cells[2][2],'arrow.right');

  // Add the spinners
  var spin_x=new VariablePosSpinText(dp);
  var spin_y=new VariablePosSpinText(dp);

  var jq=$(this);
  var that=this;
  var val_x=0;
  var val_y=0;
  
  // Handle button clicks
  $(cb_left).click( function() {
    val_x=spin_x.adj(-1);
    jq.trigger("changed",[val_x,val_y]);
    that._update_x();
  });
  $(cb_right).click( function() {
    val_x=spin_x.adj(1);
    jq.trigger("changed",[val_x,val_y]);
    that._update_x();
  });
  $(cb_up).click( function() {
    val_y=spin_y.adj(1);
    jq.trigger("changed",[val_x,val_y]);
    that._update_y();
  });
  $(cb_down).click( function() {
    val_y=spin_y.adj(-1);
    jq.trigger("changed",[val_x,val_y]);
    that._update_y();
  });
  $(cb_cleft).click(function() {
    that.setAdjPos(that.adj_pos+1);
  });
  $(cb_cright).click(function() {
    that.setAdjPos(that.adj_pos-1);
  });

  this.div_spin_x=glt.cells[0][0];
  this.div_spin_y=glt.cells[1][0];
  this.spin_x=spin_x;
  this.spin_y=spin_y;
  this.label_x='x: ';
  this.label_y='y: ';

  this.setAdjPos(-dp);
};


CoordSpinner.prototype.setValue=function(x,y) {
};

CoordSpinner.prototype.setAdjPos=function(ap) {
  this.adj_pos=ap;
  this.spin_x.setAdjPos(ap);
  this.spin_y.setAdjPos(ap);
  this._update_x();
  this._update_y();
};

CoordSpinner.prototype._update_x=function() {
  this.div_spin_x.html('<code>'+this.label_x+this.spin_x.getText()+'</code>');
};

CoordSpinner.prototype._update_y=function() {
  this.div_spin_y.html('<code>'+this.label_y+this.spin_y.getText()+'</code>');
};