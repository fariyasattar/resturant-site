import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';

// ─── Assets ───────────────────────────────
import biryani from '../assets/biryani.jpg';
import nihari from '../assets/Nihari.jpg';
import chapliKabab from '../assets/chapli_kabab.jpg';
import muttonPulao from '../assets/Muttonpulao.jpg';
import drink1 from '../assets/drink1.jpg';
import kheer from '../assets/kheer.jpg';
import food2 from '../assets/food2.jpg';
import iceCream from '../assets/ice-cream.jpg';
import chickenKarahi from '../assets/chicken-karahi.png';
import gajarHalwa from '../assets/gajarhalwa.jpg';
import tandooriBiryani from '../assets/tandooribiryani.png';
import kabab from '../assets/kabab.jpg';
import pastries from '../assets/pastries.jpg';
import food from '../assets/food.png';

// ─── Config ─────────────────────────────────
const API_URL = 'http://localhost:5000/api';

const itemImages = {
  Biryani: biryani, Nihari: nihari, 'Chapli Kabab': chapliKabab,
  'Mutton Pulao': muttonPulao, 'Mint Margarita': drink1, Kheer: kheer,
  'Roghni Naan': food2, 'Ice Cream': iceCream, 'Chicken Karahi': chickenKarahi,
  'Gajar Halwa': gajarHalwa, 'Tandoori Biryani': tandooriBiryani,
  'Seekh Kabab': kabab, Pastries: pastries, 'Tandoori Chicken': chickenKarahi,
};

const menuData = [
  { _id: '1', name: 'Biryani', desc: 'Lahori style chicken biryani', price: 400, category: 'Rice' },
  { _id: '2', name: 'Nihari', desc: 'Slow cooked beef shank nihari', price: 600, category: 'Beef' },
  { _id: '3', name: 'Chapli Kabab', desc: 'Authentic Peshawari chapli kabab', price: 350, category: 'Kabab' },
  { _id: '4', name: 'Mutton Pulao', desc: 'Yakhni pulao with tender mutton', price: 550, category: 'Rice' },
  { _id: '5', name: 'Mint Margarita', desc: 'Fresh podina drink', price: 150, category: 'Drinks' },
  { _id: '6', name: 'Kheer', desc: 'Chawal ki kheer with dry fruits', price: 200, category: 'Desserts' },
  { _id: '7', name: 'Roghni Naan', desc: 'Tandoor ka garam naan', price: 60, category: 'Bread' },
  { _id: '8', name: 'Ice Cream', desc: 'Vanilla, chocolate & strawberry', price: 120, category: 'Desserts' },
  { _id: '9', name: 'Chicken Karahi', desc: 'Boneless chicken karahi', price: 1400, category: 'Chicken' },
  { _id: '10', name: 'Gajar Halwa', desc: 'Special gajar halwa', price: 250, category: 'Desserts' },
  { _id: '11', name: 'Tandoori Biryani',desc: 'Hyderabadi tandoori biryani', price: 840, category: 'Rice' },
  { _id: '12', name: 'Seekh Kabab', desc: 'Peshawar special seekh kabab', price: 1500, category: 'Kabab' },
  { _id: '13', name: 'Pastries', desc: 'Fresh cream pastries', price: 180, category: 'Desserts' },
  { _id: '14', name: 'Tandoori Chicken',desc: 'Full tandoori murgh', price: 950, category: 'Chicken' },
];

const ALL_CATEGORIES = ['All', 'Rice', 'Beef', 'Kabab', 'Drinks', 'Desserts', 'Bread', 'Chicken'];
const ORDER_TYPES = ['Dine In', 'Takeaway', 'Delivery'];
const PAY_METHODS = [
  { label: 'Cash', icon: '💵' },
  { label: 'Card', icon: '💳' },
  { label: 'Easypaisa', icon: '📱' },
  { label: 'JazzCash', icon: '🟠' },
];

// ─── Helpers ─────────────────────────────────
let _orderCounter = Math.floor(Math.random() * 900) + 100;
const nextOrderNo = () => ++_orderCounter;

// Auto 5% discount
function calcBill(cart, taxPct) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tp = parseFloat(taxPct) || 0;
  const discount = Math.round(subtotal * 0.05);
  const taxable = subtotal - discount;
  const tax = Math.round(taxable * tp / 100);
  const total = taxable + tax;
  return { subtotal, discount, tax, total };
}

// ─── Fixed Receipt print helper ───────────────────
function printReceipt(receiptData) {
  const { orderNo, date, time, orderType, tableLabel, paymentMethod,
          cart, subtotal, discount, tax, total, notes } = receiptData;

  const rows = cart.map(i =>
    `<tr>
       <td>${i.name}</td>
       <td style="text-align:center">×${i.qty}</td>
       <td style="text-align:right">Rs ${i.price * i.qty}</td>
     </tr>`
  ).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Receipt #${orderNo}</title>
      <style>
        body { font-family: 'Courier New', monospace; max-width: 320px; margin: 0 auto; padding: 20px; font-size: 13px; color: #111; }
        h2 { text-align: center; color: #8B6914; margin: 0; font-size: 20px; }
       .sub { text-align: center; font-size: 11px; color: #888; margin: 2px 0; }
        table { width: 100%; border-collapse: collapse; margin: 8px 0; }
        td { padding: 3px 0; }
       .divider { border-top: 1px dashed #999; margin: 8px 0; }
       .total-row td { font-weight: bold; font-size: 15px; border-top: 1px dashed #999; padding-top: 6px; }
       .thanks { text-align: center; font-size: 11px; color: #888; margin-top: 12px; line-height: 1.8; }
        @media print {
          body { margin: 0; }
        }
      </style>
    </head>
    <body>
      <h2>Lahori Dastarkhan</h2>
      <p class="sub">Authentic Pakistani Cuisine</p>
      <p class="sub">📍 The Food Street, Lahore &nbsp;|&nbsp; 📞 0300-1234567</p>
      <div class="divider"></div>
      <table>
        <tr><td><b>Order #:</b> ${orderNo}</td><td style="text-align:right">${date}</td></tr>
        <tr><td><b>Time:</b> ${time}</td><td style="text-align:right">${orderType}</td></tr>
        <tr><td colspan="2"><b>Table/Name:</b> ${tableLabel || '—'}</td></tr>
        <tr><td colspan="2"><b>Payment:</b> ${paymentMethod}</td></tr>
      </table>
      <div class="divider"></div>
      <table>
        <thead><tr><th style="text-align:left">Item</th><th>Qty</th><th style="text-align:right">Amount</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="divider"></div>
      <table>
        <tr><td>Subtotal</td><td style="text-align:right">Rs ${subtotal}</td></tr>
        ${discount > 0? `<tr><td>Discount 5%</td><td style="text-align:right;color:green">- Rs ${discount}</td></tr>` : ''}
        ${tax > 0? `<tr><td>Tax</td><td style="text-align:right">Rs ${tax}</td></tr>` : ''}
        <tr class="total-row"><td>TOTAL</td><td style="text-align:right">Rs ${total}</td></tr>
      </table>
      ${notes? `<p style="font-size:11px;color:#888;font-style:italic;margin-top:8px">Note: ${notes}</p>` : ''}
      <div class="thanks">✨ Shukriya! Dobara tashreef layen ✨<br>Thank you for dining with us</div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
            window.close();
          }, 500);
        }
      </script>
    </body>
    </html>`;

  try {
    const win = window.open('', '_blank', 'width=420,height=650');

    if (!win) {
      alert('Popup blocked hai! Browser settings me pop-ups allow karo.');
      return;
    }

    win.document.open();
    win.document.write(html);
    win.document.close();

  } catch (err) {
    console.error('Print error:', err);
    alert('Print window open nahi ho saki. Popup blocker check karo.');
  }
}

// ═════════════
// MAIN COMPONENT
// ═════════════
export default function BillingModule() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [loadingId, setLoadingId] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState('Dine In');
  const [tableLabel, setTableLabel] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [notes, setNotes] = useState('');
  const [taxPct, setTaxPct] = useState('5');
  const [toast, setToast] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderId, setOrderId] = useState('');

  const filtered = menuData.filter(i =>
    activeCategory === 'All' || i.category === activeCategory
  );

  const cartMap = Object.fromEntries(cart.map(c => [c._id, c.qty]));
  const { subtotal, discount, tax, total } = calcBill(cart, taxPct);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  }, []);

  const addToCart = async (item) => {
    if (loadingId) return;
    setLoadingId(item._id);
    setCart(prev => {
      const ex = prev.find(c => c._id === item._id);
      return ex
       ? prev.map(c => c._id === item._id? {...c, qty: c.qty + 1 } : c)
        : [...prev, {...item, qty: 1 }];
    });
    try {
      await axios.post(`${API_URL}/cart/add`, { menuId: item._id, name: item.name, price: item.price, qty: 1 });
      showToast(`${item.name} added ✓`);
    } catch {
      setCart(prev => prev.filter(c => c._id!== item._id));
      showToast('Item add nahi hua ✗');
    } finally {
      setLoadingId(null);
    }
  };

  const updateQty = async (itemId, delta) => {
    setCart(prev => {
      const item = prev.find(i => i._id === itemId);
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) return prev.filter(i => i._id!== itemId);
      return prev.map(i => i._id === itemId? {...i, qty: newQty } : i);
    });
    try {
      const item = cart.find(i => i._id === itemId);
      const newQty = (item?.qty || 1) + delta;
      if (newQty <= 0) {
        await axios.delete(`${API_URL}/cart/remove/${itemId}`);
      } else {
        await axios.put(`${API_URL}/cart/update`, { menuId: itemId, qty: newQty });
      }
    } catch { /* silent */ }
  };

  const removeItem = async (itemId) => {
    setCart(prev => prev.filter(i => i._id!== itemId));
    await axios.delete(`${API_URL}/cart/remove/${itemId}`).catch(() => {});
  };

  const clearOrder = () => {
    setCart([]);
    setTaxPct('5');
    setNotes('');
    setTableLabel('');
    setOrderId('');
    showToast('Order cleared');
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setPlacingOrder(true);
    try {
      const res = await axios.post(`${API_URL}/orders`, {
        customerName: tableLabel || 'Walk-in',
        orderType,
        paymentMethod,
        items: cart,
        subtotal, discount, tax, total,
        notes,
      });

      const newOrderId = res.data?.orderId || `ORD-${nextOrderNo()}`;
      setOrderId(newOrderId);

      const now = new Date();
      const data = {
        orderNo: newOrderId,
        date: now.toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: now.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }),
        orderType, tableLabel, paymentMethod,
        cart: [...cart],
        subtotal, discount, tax, total, notes,
      };
      setReceiptData(data);
      setShowReceipt(true);
    } catch (err) {
      const now = new Date();
      const newOrderId = `ORD-${nextOrderNo()}`;
      setOrderId(newOrderId);
      const data = {
        orderNo: newOrderId,
        date: now.toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: now.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }),
        orderType, tableLabel, paymentMethod,
        cart: [...cart],
        subtotal, discount, tax, total, notes,
      };
      setReceiptData(data);
      setShowReceipt(true);
    } finally {
      setPlacingOrder(false);
    }
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    clearOrder();
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white font-sans" id="billing" id ="menu">

      {/* LEFT: Menu Panel */}
      <div className="w-[54%] border-r border-[#2A2A2A] flex-col overflow-hidden">
        <div className="px-6 py-5 border-b border-[#2A2A2A] bg-[#111]">
          <h2 className="text-2xl font-bold text-yellow-500" style={{ fontFamily: 'Georgia, serif' }}>
            Menu
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Tap an item to add to order</p>
        </div>

        <div className="flex gap-2 px-6 py-3 border-b border-[#2A2A2A] bg-[#111] overflow-x-auto scrollbar-hide">
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs border transition-all ${
                activeCategory === cat
                 ? 'bg-yellow-500 border-yellow-500 text-black font-semibold'
                  : 'border-[#333] text-gray-400 hover:border-yellow-500 hover:text-yellow-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid-cols-2 gap-3 content-start">
          {filtered.map(item => {
            const qtyInCart = cartMap[item._id] || 0;
            const isLoading = loadingId === item._id;
            return (
              <div
                key={item._id}
                onClick={() =>!isLoading && addToCart(item)}
                className="relative bg-[#1A1A1A] border-[#2A2A2A] hover:border-yellow-500 hover:bg-[#222] cursor-pointer rounded-xl p-3 flex-col gap-1 transition-all"
              >
                {qtyInCart > 0 && (
                  <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {qtyInCart}
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <img
                    src={itemImages[item.name] || food}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600 uppercase tracking-widest">{item.category}</p>
                    <p className="text-sm font-medium text-white leading-tight truncate">{item.name}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-tight">{item.desc}</p>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-yellow-500 font-semibold text-sm">Rs {item.price}</span>
                  <button
                    onClick={e => { e.stopPropagation(); addToCart(item); }}
                    disabled={isLoading}
                    className="bg-yellow-500 text-black w-6 h-6 rounded-md text-lg font-bold flex items-center justify-center hover:bg-yellow-400 active:scale-95 transition-transform disabled:opacity-50"
                  >
                    {isLoading? '·' : '+'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Billing Panel */}
      <div className="w-[46%] flex-col bg-[#111]">
        <div className="px-6 py-5 border-b border-[#2A2A2A]">
          <h2 className="text-2xl font-bold text-yellow-500" style={{ fontFamily: 'Georgia, serif' }}>
            Current Order
          </h2>

          <div className="flex gap-2 mt-3">
            {ORDER_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`flex-1 py-1.5 rounded-lg border text-xs transition-all ${
                  orderType === type
                   ? 'border-yellow-500 text-yellow-500 bg-[#1A1A1A]'
                    : 'border-[#333] text-gray-500 hover:border-gray-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Table number or customer name..."
            value={tableLabel}
            onChange={e => setTableLabel(e.target.value)}
            className="w-full mt-2 bg-[#1A1A1A] border-[#333] text-white px-3 py-2 rounded-lg text-xs outline-none focus:border-yellow-500 placeholder-gray-600"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-3">
          {cart.length === 0? (
            <div className="h-full flex-col items-center justify-center gap-2 text-gray-600">
              <span className="text-4xl opacity-30">🍽️</span>
              <p className="text-sm">No items added yet</p>
              <p className="text-xs">Select from the menu</p>
            </div>
          ) : (
            <div className="space-y-1">
              {cart.map(item => (
                <div key={item._id} className="flex items-center gap-3 py-2.5 border-b border-[#1E1E1E]">
                  <img
                    src={itemImages[item.name] || food}
                    alt={item.name}
                    className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category} · Rs {item.price} each</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#1A1A1A] border-[#2A2A2A] rounded-lg px-2 py-1">
                    <button
                      onClick={() => updateQty(item._id, -1)}
                      className="text-yellow-500 text-base w-4 text-center leading-none hover:text-yellow-300 transition-colors"
                    >−</button>
                    <span className="text-sm font-medium w-5 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item._id, 1)}
                      className="text-yellow-500 text-base w-4 text-center leading-none hover:text-yellow-300 transition-colors"
                    >+</button>
                  </div>
                  <span className="text-yellow-500 text-sm font-medium w-16 text-right">
                    Rs {item.price * item.qty}
                  </span>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-gray-600 hover:text-red-500 transition-colors text-base"
                  >🗑</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-6 pb-3">
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Special instructions, allergies, preferences..."
              rows={2}
              className="w-full bg-[#1A1A1A] border-[#2A2A2A] text-white px-3 py-2 rounded-lg text-xs outline-none focus:border-yellow-500 placeholder-gray-600 resize-none"
            />
          </div>
        )}

        {cart.length > 0 && (
          <div className="px-6 py-4 border-t border-[#2A2A2A] bg-[#1A1A1A]">
            <div className="mb-3 p-2 bg-yellow-500/10 border-yellow-500/30 rounded-lg text-xs text-yellow-500 text-center">
              5% Discount Applied Automatically
            </div>

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span><span>Rs {subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Discount 5%</span><span>− Rs {discount}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400 items-center">
                <span>Tax %</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={taxPct}
                  onChange={e => setTaxPct(e.target.value)}
                  className="w-16 bg-[#0A0A0A] border-[#333] text-white px-2 py-1 rounded-lg text-xs outline-none focus:border-yellow-500 text-right"
                />
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax</span><span>Rs {tax}</span>
              </div>
              <div className="flex justify-between text-white font-semibold text-base border-t border-[#2A2A2A] pt-2 mt-2">
                <span>Total</span>
                <span className="text-yellow-500 text-xl" style={{ fontFamily: 'Georgia, serif' }}>
                  Rs {total}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="px-6 pb-6 pt-4">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">Payment Method</p>
          <div className="flex gap-2 mb-4">
            {PAY_METHODS.map(m => (
              <button
                key={m.label}
                onClick={() => setPaymentMethod(m.label)}
                className={`flex-1 py-2 rounded-lg border text-xs flex-col items-center gap-0.5 transition-all ${
                  paymentMethod === m.label
                   ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10'
                    : 'border-[#2A2A2A] text-gray-500 hover:border-gray-500'
                }`}
              >
                <span className="text-base">{m.icon}</span>
                {m.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={clearOrder}
              className="flex-1 py-3 rounded-lg border-[#333] text-gray-400 text-sm font-medium hover:border-gray-400 hover:text-white transition-all"
            >
              Clear
            </button>
            <button
              onClick={handlePlaceOrder}
              disabled={cart.length === 0 || placingOrder}
              className="flex-[2] py-3 rounded-lg bg-yellow-500 text-black text-sm font-semibold hover:bg-yellow-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {placingOrder? 'Placing Order...' : 'Place Order & Bill'}
            </button>
          </div>
        </div>
      </div>

      {/* Receipt Modal with QR Code */}
      {showReceipt && receiptData && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-gray-900 rounded-xl w-80 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="text-center border-b-2 border-dashed border-gray-200 pb-4 mb-4">
                <h3 className="text-xl font-bold text-yellow-700" style={{ fontFamily: 'Georgia, serif' }}>
                  Lahori Dastarkhan
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">Authentic Pakistani Cuisine</p>
                <p className="text-xs text-gray-400">📍 The Food Street, Lahore</p>
                <p className="text-xs text-gray-400">📞 0300-1234567</p>
              </div>

              <div className="text-xs text-gray-500 space-y-0.5 mb-4">
                <div className="flex justify-between"><span><b>Order #:</b> {receiptData.orderNo}</span><span>{receiptData.date}</span></div>
                <div className="flex justify-between"><span><b>Time:</b> {receiptData.time}</span><span>{receiptData.orderType}</span></div>
                <div><b>Table/Name:</b> {receiptData.tableLabel || '—'}</div>
                <div><b>Payment:</b> {receiptData.paymentMethod}</div>
              </div>

              <div className="border-t border-b border-dashed border-gray-200 py-3 mb-3 space-y-1.5">
                {receiptData.cart.map(item => (
                  <div key={item._id} className="flex gap-2 text-xs">
                    <span className="flex-1 text-gray-700">{item.name}</span>
                    <span className="text-gray-400">×{item.qty}</span>
                    <span className="font-medium w-16 text-right">Rs {item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs space-y-1 mb-3">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>Rs {receiptData.subtotal}</span></div>
                {receiptData.discount > 0 && (
                  <div className="flex justify-between text-green-600"><span>Discount 5%</span><span>− Rs {receiptData.discount}</span></div>
                )}
                {receiptData.tax > 0 && (
                  <div className="flex justify-between text-gray-500"><span>Tax</span><span>Rs {receiptData.tax}</span></div>
                )}
                <div className="flex justify-between font-bold text-sm text-gray-900 border-t border-dashed border-gray-200 pt-2 mt-1">
                  <span>TOTAL</span><span>Rs {receiptData.total}</span>
                </div>
              </div>

              <div className="text-center py-4 border-t border-dashed border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Scan this QR at counter</p>
                <div className="bg-white inline-block p-3 rounded-lg">
                  <QRCodeSVG value={orderId} size={140} level="H" />
                </div>
                <p className="text-xs text-gray-400 mt-2">Order ID: {orderId}</p>
              </div>

              {receiptData.notes && (
                <p className="text-xs text-gray-400 italic mb-3">Note: {receiptData.notes}</p>
              )}

              <div className="text-center text-xs text-gray-400 border-t border-dashed border-gray-200 pt-3 leading-relaxed">
                ✨ Shukriya! Dobara tashreef layen ✨<br />
                Thank you for dining with us
              </div>
            </div>

            <div className="flex gap-2 px-6 pb-5">
              <button
                onClick={() => printReceipt(receiptData)}
                className="flex-1 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors"
              >
                🖨️ Print
              </button>
              <button
                onClick={closeReceipt}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-[#1A1A1A] border-yellow-600 text-white px-5 py-2.5 rounded-full text-sm z-50 shadow-lg animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  );
}