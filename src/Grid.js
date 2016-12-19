import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import './App.css';
import ReactIntl from 'react-intl';
import {IntlMixin, IntlProvider, FormattedMessage, FormattedNumber} from 'react-intl';
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
            startDate: randomDate(new Date(2015, 3, 1), new Date()),
            completeDate: randomDate(new Date(), new Date(2016, 0, 1))
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
        editable: true
    },
    {
        key: 'data_baixa',
        name: 'Data Baixa',
        editable: true
    },
    {
        key: 'conta',
        name: 'Conta',
        editable: true
    }
];


var Example = React.createClass({

    getInitialState: function () {
        return {rows: createRows(1000)}
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

    render: function () {
        return (
            <IntlProvider locale="en">
            <ReactDataGrid
                enableCellSelect={true}
                columns={columns}
                rowGetter={this.rowGetter}
                rowHeight={50}
                rowsCount={this.state.rows.length}
                minHeight={500}
                onRowUpdated={this.handleRowUpdated}/>
            </IntlProvider>
        )
    }

});

export default Example;
