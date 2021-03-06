import styles from './styles.module.scss';

export default function table() {

    const list = new Array(
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        '31', '32', '33', '34', '35', '36', '37', '38', '39', '30',
        '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
        '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
    );

    return (

        <main className={styles.container}>
            <h3> TABELA DE CLIENTES </h3>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>login</th>
                        <th>email</th>
                        <th>telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(item => (
                            <tr key={item}>
                                <td>fulano de souza</td>
                                <td>fulaninhoSouza</td>
                                <td>fulaninhoSouza@gmail.com</td>
                                <td>99999-9999</td>
                            </tr>)
                        )
                    }
                </tbody>
            </table>
        </main>

    )
}