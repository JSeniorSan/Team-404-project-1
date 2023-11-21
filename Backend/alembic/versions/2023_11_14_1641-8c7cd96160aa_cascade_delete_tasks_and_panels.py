"""Cascade delete tasks and panels

Revision ID: 8c7cd96160aa
Revises: 4d90cb0c5932
Create Date: 2023-11-14 16:41:29.343724

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8c7cd96160aa'
down_revision: Union[str, None] = '4d90cb0c5932'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('panels_workspace_id_fkey', 'panels', type_='foreignkey')
    op.create_foreign_key(None, 'panels', 'workspaces', ['workspace_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('tasks_panel_id_fkey', 'tasks', type_='foreignkey')
    op.create_foreign_key(None, 'tasks', 'panels', ['panel_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tasks', type_='foreignkey')
    op.create_foreign_key('tasks_panel_id_fkey', 'tasks', 'panels', ['panel_id'], ['id'])
    op.drop_constraint(None, 'panels', type_='foreignkey')
    op.create_foreign_key('panels_workspace_id_fkey', 'panels', 'workspaces', ['workspace_id'], ['id'])
    # ### end Alembic commands ###