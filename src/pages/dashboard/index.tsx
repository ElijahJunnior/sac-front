import styles from './styles.module.scss';

export default function dashboard() {

    let list = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');

    return (
        <main className={styles.container}>
            <section className={styles.pageHeader}>
                <h2>Dashboard</h2>
            </section>
            <section className={styles.cards}>
                <div>
                    <strong>999</strong>
                    <p>Abertas</p>
                </div>
                <div>
                    <strong>999</strong>
                    <p>Em Atendimento</p>
                </div>
                <div>
                    <strong>999</strong>
                    <p>Fechadas</p>
                </div>
                <div>
                    <strong>999</strong>
                    <p>Tempo Médio</p>
                </div>
            </section>
            <section className={`${styles.dataTable} ${styles.scrollbar}`}>
                <h3>Ocorrencias</h3>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Data
                            </th>
                            <th>
                                <p>Espera</p>
                                <p>Status</p>
                            </th>
                            <th>
                                <p>Prioridade</p>
                                <p>Sistema</p>
                            </th>
                            <th>
                                Categoria
                            </th>
                            <th>
                                Cliente
                            </th>
                            <th>
                                Descrição
                            </th>
                            <th>
                                Provid.
                            </th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {list.map(item => (
                            <tr key={item}>
                                <td>
                                    <p>19 Nov</p>
                                    <p>18:22</p>
                                </td>
                                <td>
                                    <p>35:55</p>
                                    <p>Encaminhado</p>
                                </td>
                                <td>
                                    <p>Normal</p>
                                    <p>Rataguarda</p>
                                </td>
                                <td>
                                    <p>Serviços</p>
                                    <p>Reinstalação de Sistema</p>
                                </td>
                                <td>
                                    <p>LR7 COMERCIO DE EMB...</p>
                                    <span>Paulinho</span>
                                    <span>21 99999-9999</span>
                                </td>
                                <td>
                                    A cliente solicitou que a GO2 removesse o sistema da ...
                                </td>
                                <td>
                                    9999
                                </td>
                                <td>
                                    <button> ... </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <p>19 Nov</p>
                                <p>18:22</p>
                            </td>
                            <td>
                                <p>35:55</p>
                                <p>Encaminhado</p>
                            </td>
                            <td>
                                <p>Normal</p>
                                <p>Rataguarda</p>
                            </td>
                            <td>
                                <p>Serviços</p>
                                <p>Reinstalação de Sistema</p>
                            </td>
                            <td>
                                <p>LR7 COMERCIO DE EMB...</p>
                                <span>Paulinho</span>
                                <span>21 99999-9999</span>
                            </td>
                            <td>
                                A cliente solicitou que a GO2 removesse o sistema da ...
                            </td>
                            <td>
                                9999
                            </td>
                            <td>
                                <button> ... </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>19 Nov</p>
                                <p>18:22</p>
                            </td>
                            <td>
                                <p>35:55</p>
                                <p>Em Atendimento</p>
                            </td>
                            <td>
                                <p>Média</p>
                                <p>Rataguarda</p>
                            </td>
                            <td>
                                <p>Duvidas</p>
                                <p>Emissão de NFe</p>
                            </td>
                            <td>
                                <p>OPTTECNICA CLINICA LTDA</p>
                                <span>Cliente</span>
                                <span>21 99999-9999</span>
                            </td>
                            <td>
                                Cliente gostaria de saber como emitir uma NFE de devolução
                            </td>
                            <td>
                                9999
                            </td>
                            <td>
                                <button> ... </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>19 Nov</p>
                                <p>18:22</p>
                            </td>
                            <td>
                                <p>35:55</p>
                                <p>Aberto</p>
                            </td>
                            <td>
                                <p>Alta</p>
                                <p>Rataguarda</p>
                            </td>
                            <td>
                                <p>Serviços</p>
                                <p>Reinstalação de Sistema</p>
                            </td>
                            <td>
                                <p>INTERPEL COMERCIO DE...</p>
                                <span>Cliente</span>
                                <span>21 99999-9999</span>
                            </td>
                            <td>
                                A cliente solicitou que a GO2 removesse o sistema da ...
                            </td>
                            <td>
                                9999
                            </td>
                            <td>
                                <button> ... </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main >
    )
}