export function activateEditMode() {
    let me = $(this);
    let table = me.parents('table');
    let tr = me.parents('tr');
    let row = table.find('tr').index(tr);
    let col = tr.find('td').index(me);
    me.css({ position: 'relative' });
    $('.preview-changes').show();
    $('.go-live').hide();
    if (me.find('input').length > 0) { return; /*edited before*/ }
    me.append(`<input class="data-change" data-row="${row}" data-col="${col}" type="text" style="margin-top:3px;text-align:center;border:0;background-color:rgb(151, 216, 143);top:0;left:0;position:absolute;width:${me.width()}px;height:${me.height()}px" value="${matrix[row][col]}">`);
    me.css({ backgroundColor: 'rgb(151, 216, 143)', border: '2px dotted #000' });
    me.find('input').focus();
}

export async function goLive() {
    if (!confirm('Are you sure?')) { return; }
    await fetch('/go-live/' + locationParam('preview'));
    location.replace('/?edit=1');
}