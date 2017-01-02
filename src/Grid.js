import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import {Toolbar, Data} from 'react-data-grid/addons';
import update from 'react-addons-update';

import ReactIntl from 'react-intl';
import {IntlMixin, IntlProvider, FormattedMessage, FormattedNumber, FormattedDate} from 'react-intl';
//helper to generate a random date

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

//helper to create a fixed number of rows
function createRows(numberOfRows) {
    var _rows = [];
    for (var i = 1; i < numberOfRows; i++) {
        _rows.push({
            data_emissao: i,
            classificacao: 'Task ' + i,
            fornecedor: Math.min(100, Math.round(Math.random() * 110)),
            condicao: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
            issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
            valor: 5.91,
            data_vencimento: '06-12-1991',
            data_baixa: '05-12-1991'
        });
    }
    return _rows;
}

var PercentCompleteFormatter = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        if (!this.props.value) return (<div></div>);
        var percentComplete = this.props.value;

        return (

            <FormattedNumber value={percentComplete} style="currency" currency="BRL"/>            );
    }
});

var DateFormatter = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        if (!this.props.value) return (<div></div>);
        var percentComplete = this.props.value;
        console.log(percentComplete);
        return (

            <FormattedDate
                value={new Date(percentComplete)}
            /> )
    }
});

//Columns definition
var columns = [
    {
        key: 'data_emissao',
        name: 'Data Emissão',
        width: 80,
        height: 10,
        editable: true
    },
    {
        key: 'classificacao',
        name: 'Classificação',
        editable: true
    },
    {
        key: 'fornecedor',
        name: 'Fornecedor',
        editable: true
    },
    {
        key: 'condicao',
        name: 'Condição',
        editable: true
    },
    {
        key: 'doc',
        name: 'Doc',
        editable: true
    },
    {
        key: 'cheque',
        name: 'Cheque',
        editable: true
    },
    {
        key: 'parcela',
        name: 'Parcela',
        editable: true
    },
    {
        key: 'valor',
        name: 'Valor',
        editable: true,
        formatter: PercentCompleteFormatter

    },
    {
        key: 'data_vencimento',
        name: 'Data Vencimento',
        editable: true,
        formatter: DateFormatter

    },
    {
        key: 'data_baixa',
        name: 'Data Baixa',
        editable: true,
        formatter: DateFormatter
    },
    {
        key: 'conta',
        name: 'Conta',
        editable: true
    }
];


var Example = React.createClass({

    getInitialState: function () {
        return {rows: createRows(5)}
    },

    rowGetter: function (rowIdx) {
        return this.state.rows[rowIdx]
    },

    handleRowUpdated: function (e) {
        //merge updated row with current row and rerender by setting state
        var rows = this.state.rows;
        Object.assign(rows[e.rowIdx], e.updated);
        this.setState({rows: rows});
        console.log(e);
    },

    handleAddRow: function (e) {
        var newRow = {
            data_emissao: '',
            classificacao: '',
            fornecedor: '',
            condicao: '',
            issueType: '',
            startDate: '',
            completeDate: ''
        };
        var rows = update(this.state.rows, {$push: [newRow]});
        this.setState({rows: rows});
    },
    render: function () {
        return (
            <IntlProvider locale="en">
            <ReactDataGrid
                enableCellSelect={true}
                toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
                columns={columns}
                rowGetter={this.rowGetter}
                rowsCount={this.state.rows.length}
                minHeight={750}
                onRowUpdated={this.handleRowUpdated}/>
            </IntlProvider>
        )
    }

});

export default Example;
