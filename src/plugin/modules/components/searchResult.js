define([
    'knockout-plus',
    'jquery',
    'kb_common/html'
], function (
    ko,
    $,
    html
) {
    'use strict';

    var t = html.tag,
        div = t('div');

    var styles = html.makeStyles({
        component: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column'
        },
        miniButton: {
            css: {
                padding: '2px',
                border: '2px transparent solid',
                cursor: 'pointer'
            },
            pseudo: {
                hover: {
                    border: '2px white solid'
                },
                active: {
                    border: '2px white solid',
                    backgroundColor: '#555',
                    color: '#FFF'
                }
            }
        }
    });

    function viewModel(params) {
        var search = params.search;
        var searchResults = search.searchResults;
        var searching = search.searching;

        var columns = params.search.columns;

        function sortBy(column) {
            // fake for now...
            if (!column.sort) {
                return;
            }
            if (!column.sort.active()) {
                column.sort.active(true);
            }

            if (column.sort.direction() === 'ascending') {
                column.sort.direction('descending');
            } else {
                column.sort.direction('ascending');
            }
           
            search.sortBy(column.sort);
        }

        sortBy(columns[3]);

        return {
            search: params.search,
            searchResults: searchResults,
            searching: searching,
            table: {
                // a quick hack untl we tame the data layer...
                rows: searchResults.map(function (item) {
                    return item.simpleBrowse;
                }),
                columns: columns,
                isLoading: searching,
                pageSize: search.pageSize,
                state: search.searchState,
                sortBy: sortBy
            },
        };
    }

    function template() {
        return div({
            class: styles.classes.component
        }, [
            styles.sheet,
            div({
                dataBind: {
                    component: {
                        name: '"reske-simple-search/table"',
                        params: {
                            table: 'table'
                        }
                    }
                },
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1 1 0px'
                }
            })
        ]);
    }

    function component() {
        return {
            viewModel: {
                createViewModel: viewModel
            },
            template: template()
        };
    }

    return component;
});
